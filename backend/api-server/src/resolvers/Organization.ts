import { ApolloError } from "apollo-server-express";
import { Arg, Authorized, Ctx, FieldResolver, ID, Mutation, Query, Resolver, Root } from "type-graphql";
import { DeleteResult, In, Not } from "typeorm";
import { BookingItem } from "../entity/BookingItem";
import { Event } from "../entity/Event";
import { Organization } from "../entity/Organization";
import { OrganizationTeamMember } from "../entity/OrganizationTeamMember";
import { User } from "../entity/User";
import { AddOrganizationInput } from "../inputs/OrganizationInput/AddOrganizationInput";
import { UpdateOrganizationInput } from "../inputs/OrganizationInput/UpdateOrganizationInput";
import { IContext } from "../interface/IContext";

@Resolver(of => Organization)
export class OrganizationResolver {

    /* 
     *
     * ORGANIZATION ROLE
     * 
    */    

    // Query organization data
    @Query(type => Organization)
    @Authorized('ORGANIZATION')
    async organization(
        @Ctx() { req }: IContext
    ): Promise<Organization | undefined> {
        try {
            const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ "user", "organization" ] });
            if(!orgTeamMember) {
                throw new ApolloError('Requested user does not belong to the organization');
            }
            
            return orgTeamMember.organization;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }

    // Add new member in an organization
    @Mutation(type => OrganizationTeamMember)
    @Authorized('ORGANIZATION')
    async addTeamMember(
        @Arg('email', type => String) email: string,
        @Ctx() { req }: IContext
    ): Promise<OrganizationTeamMember | undefined> {
        try {
            const organizationTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ 'user', 'organization' ] });
            
            if(!organizationTeamMember) {
                throw new ApolloError('Requested user does not belong to the organization');
            }

            const user: User | undefined = await User.findOne({ where: { email, role: Not('organization') } });
            
            if(!user) {
                throw new ApolloError('User is not a registered user or User is a part of another organization');
            }
            
            const orgTeamMember: OrganizationTeamMember = await OrganizationTeamMember.create({ user, organization: organizationTeamMember.organization }).save();
    
            user.role = 'organization';
            await user.save();
            
            return orgTeamMember;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }

    // Remove member from an organization
    @Mutation(type => Boolean)
    @Authorized('ORGANIZATION')
    async removeTeamMember(
        @Arg('email', type => String) email: string,
        @Ctx() { req }: IContext
    ): Promise<Boolean | undefined> {
        try {
            const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ 'user', 'organization' ] });
            
            if(!orgTeamMember) {
                throw new ApolloError('Requested user does not belong to the organization');
            }

            const user: User | undefined = await User.findOne({ where: { email, role: 'organization', id: Not(orgTeamMember.user.id), organizationTeamMember: { organization: { id: orgTeamMember.organization.id } } }, relations: [ 'organizationTeamMember', 'organizationTeamMember.organization' ] });
            
            if(!user) {
                throw new ApolloError('User not found or User cannot remove themselves from team member');
            }

            const organizationTeamMember: DeleteResult | undefined = await OrganizationTeamMember.delete({ id: user.organizationTeamMember.id });
            
            if(!organizationTeamMember.affected) {
                throw new ApolloError('User not found in team members of an organization');
            }
            
            user.role = 'user';
            await user.save();
        
            return true;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }

    // Create organization
    @Mutation(type => Organization)
    @Authorized('USER')
    async createOrganization(
        @Arg('data', type => AddOrganizationInput) data: AddOrganizationInput,
        @Ctx() { req }: IContext
    ): Promise<Organization | undefined> {
        try {
            const user: User | undefined = await User.findOne({ where: { id: req.userId, role: Not('organization') } });
            if(!user) {
                throw new ApolloError('User does not exist or already a part of an organization');
            }
            
            const organization: Organization = await Organization.create(data).save();
            const orgTeamMember: OrganizationTeamMember = await OrganizationTeamMember.create({ user, organization }).save();
            
            user.role = 'organization';
            await user.save();
            return orgTeamMember.organization;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }
    
    // Delete organization
    @Mutation(type => Boolean)
    @Authorized('ORGANIZATION')
    async deleteOrganization(
        @Ctx() { req }: IContext
    ): Promise<Boolean | undefined> {
        try {
            const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ "user", "organization" ] });
            
            if(!orgTeamMember) {
                throw new ApolloError('User is not a part of an organization');
            }

            const teamMembers: OrganizationTeamMember[] | undefined = await OrganizationTeamMember.find({ where: { organization: { id: orgTeamMember.organization.id } }, relations: [ 'user', 'organization' ] });
            
            const org: DeleteResult = await Organization.delete({ id: orgTeamMember?.organization.id });
            
            if(!org.affected) {
                throw new ApolloError('Organization not found');
            }
            
            const usersId: string[] = teamMembers.map( member => `${member.user.id}` );
            for(let userId of usersId) {
                const user: User | undefined = await User.findOne(userId);
                if(user) {
                    user.role = 'user';
                    await user.save();
                }
            }
        
            return true;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }

    // Update organization data
    @Mutation(type => Organization)
    @Authorized('ORGANIZATION')
    async updateOrganization(
        @Arg('data', type => UpdateOrganizationInput) data: UpdateOrganizationInput,
        @Ctx() { req }: IContext
    ): Promise<Organization | undefined> {
        try {
            const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ 'user', 'organization' ] });
            if(!orgTeamMember) {
                throw new ApolloError('User is not a part of an organization');
            }
    
            const org: Organization | undefined = await Organization.findOne({ where: { id: orgTeamMember.organization.id } });
            
            if(!org) {
                throw new ApolloError('Organization not found');
            }
    
            org.name = data.name || org.name;
            org.description = data.description || org.description;
            org.contactNo = data.contactNo || org.contactNo;
            org.email = data.email || org.email;
            org.photo = data.photo || org.photo;
            
            await org.save();
            return org;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    } 


    /* 
     *
     * Field Resolver
     * 
    */
    
    @FieldResolver(type => String)
    photo(@Root() parent: Organization): string {
        return parent.photo && parent.photo.toString();
    }

    @FieldResolver(type => [OrganizationTeamMember], { nullable: true })
    async teamMembers(@Root() parent: Organization): Promise<OrganizationTeamMember[] | undefined> {
        try {
            return await OrganizationTeamMember.find({ where: { organization: { id: parent.id } }, relations: [ "user", "organization" ] });
        } catch(err: any) {
            console.log(err);
        }
    }

    @FieldResolver(type => [Event], { nullable: true })
    async events(
        @Root() parent: Organization
    ): Promise<Event[] | undefined> {
        try {
            return await Event.find({ relations: [ 'organization' ], where: { organization: { id: parent.id } } });
        } catch(err: any) {
            console.log(err);
        }
    }

    @FieldResolver(type => [BookingItem], { nullable: true })
    async bookingItems(
        @Root() parent: Organization
    ): Promise<BookingItem[] | undefined> {
        try {
            return await BookingItem.find({ where: { organization: { id: parent.id } }, relations: [ 'booking', 'price', 'timing', 'organization' ] });
        } catch(err: any) {
            console.log(err);
        }
    }
}