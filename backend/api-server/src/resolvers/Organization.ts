import { ApolloError } from "apollo-server-express";
import { Arg, Authorized, Ctx, FieldResolver, ID, Mutation, Query, Resolver, Root } from "type-graphql";
import { DeleteResult } from "typeorm";
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
                throw new ApolloError('Organization not found');
            }
            
            return orgTeamMember.organization;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }

    // Add new member in organization
    @Mutation(type => OrganizationTeamMember)
    @Authorized('ORGANIZATION')
    async addTeamMember(
        @Arg('email', type => String) email: string,
        @Arg('orgId', type => ID) orgId: number
    ): Promise<OrganizationTeamMember | undefined> {
        try {
            const user: User | undefined = await User.findOne({ where: { email } });
            
            if(!user) {
                throw new ApolloError('User email not found');
            }
    
            if(user.role === 'organization') {
                throw new ApolloError('User is already a member of an organization');
            }
    
            const teamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: user.id } } });
            if(teamMember) {
                throw new ApolloError('User already exists in organization team members');
            }
            
            const organization: Organization | undefined = await Organization.findOne(orgId);
            
            if(!organization) {
                throw new ApolloError('Organization not found');
            }
            
            const orgTeamMember: OrganizationTeamMember = await OrganizationTeamMember.create({ user, organization }).save();
    
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

    // Remove member in organization
    @Mutation(type => Boolean)
    @Authorized('ORGANIZATION')
    async removeTeamMember(
        @Arg('email', type => String) email: string,
        @Ctx() { req }: IContext
    ): Promise<Boolean | undefined> {
        try {
            const user: User | undefined = await User.findOne({ where: { email } });
    
            if(!user) {
                throw new ApolloError('User email not found');
            }
            
            if(req.userId === user.id) {
                throw new ApolloError('Organization team member cannot remove themselves from team members');
            }
    
            if(user.role !== 'organization') {
                throw new ApolloError('User is not a part of an organization');
            }

            const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ 'user', 'organization' ] });
            
            if(!orgTeamMember) {
                throw new ApolloError('Requested user is not part of an organization');
            }

            const organizationTeamMember: DeleteResult | undefined = await OrganizationTeamMember.delete({ user: { id: user.id }, organization: { id: orgTeamMember.organization.id } });
            
            if(!organizationTeamMember.affected) {
                throw new ApolloError('User not found');
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
            const user: User = await User.findOne(req.userId);
            if(!user) {
                throw new ApolloError('User does not exist');
            }
            
            if(user.role === 'organization') {
                throw new ApolloError('User already a part of an organization');
            }
            
            user.role = 'organization';
            await user.save();
            
            const organization: Organization = await Organization.create(data).save();
            if(!organization) {
                throw new ApolloError('Failed to create an organization');
            }
            
            const orgTeamMember: OrganizationTeamMember = await OrganizationTeamMember.create({ user, organization }).save();
            
            return organization;
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
            
            const org: DeleteResult = await Organization.delete({ id: orgTeamMember?.organization.id });
            
            if(!org.affected) {
                throw new ApolloError('Organization not found');
            }
            
            const user: User | undefined = await User.findOne(req.userId);
            
            if(!user) {
                throw new ApolloError('User not found');
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
                throw new ApolloError('User not found');
            }
    
            const org: Organization | undefined = await Organization.findOne(orgTeamMember.organization.id);
            
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
}