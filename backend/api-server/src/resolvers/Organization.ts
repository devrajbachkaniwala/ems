import { Arg, Authorized, Ctx, FieldResolver, ID, Mutation, Query, Resolver, Root } from "type-graphql";
import { DeleteResult } from "typeorm";
import { Organization } from "../entity/Organization";
import { OrganizationTeamMember } from "../entity/OrganizationTeamMember";
import { User } from "../entity/User";
import { AddOrganizationInput } from "../inputs/OrganizationInput/AddOrganizationInput";
import { UpdateOrganizationInput } from "../inputs/OrganizationInput/UpdateOrganizationInput";
import { IContext } from "../interface/IContext";

@Resolver(of => Organization)
export class OrganizationResolver {

    @FieldResolver(type => String)
    photo(@Root() parent: Organization): string {
        return parent.photo && parent.photo.toString();
    }

    @FieldResolver(type => [OrganizationTeamMember], { nullable: true })
    async teamMembers(@Root() parent: Organization): Promise<OrganizationTeamMember[]> {
        return await OrganizationTeamMember.find({ where: { organization: { id: parent.id } }, relations: [ "user", "organization" ] });
    }

    @Mutation(type => Organization)
    @Authorized('ORGANIZATION')
    async addTeamMember(
        @Arg('userId', type => ID) userId: number,
        @Arg('orgId', type => ID) orgId: number
    ) {
        const user: User | undefined = await User.findOne(userId);
        if(!user) {
            return;
        }

        if(user.role === 'organization') {
            return;
        }
        user.role = 'organization';
        await user.save();
        const organization: Organization | undefined = await Organization.findOne(orgId);
        if(!organization) {
            return;
        }
        const orgTeamMember = await OrganizationTeamMember.create({ user, organization }).save();

        return organization;
    }

    @Query(type => Organization)
    @Authorized('ORGANIZATION')
    async getOrganization(
        @Ctx() { req }: IContext
    ): Promise<Organization | undefined> {
        const org: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ "user", "organization" ] });
        if(!org) {
            return;
        }
        return org.organization;
    }

    @Mutation(type => Organization)
    @Authorized('USER')
    async addOrganization(
        @Arg('data', type => AddOrganizationInput) data: AddOrganizationInput,
        @Ctx() { req }: IContext
    ): Promise<Organization | undefined> {
        try {
            const user: User = await User.findOne(req.userId);
            
            if(user.role === 'organization') {
                return;
            }
            
            user.role = 'organization';
            const organization: Organization = await Organization.create(data).save();
            await user.save();
            const orgTeamMember = await OrganizationTeamMember.create({ user, organization }).save();
            return organization;
        } catch(err: any) {
            console.log(err);
        }
    }
    
    @Mutation(type => Boolean)
    @Authorized('ORGANIZATION')
    async removeOrganization(
        @Ctx() { req }: IContext
    ): Promise<Boolean | undefined> {
        try {
            const org: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ "user", "organization" ] });
            if(!org) {
                return false;
            }
            const res: DeleteResult = await Organization.delete({ id: org?.organization.id });
            if(!res) {
                return false;
            }
            const user: User | undefined = await User.findOne(req.userId);
            if(!user) {
                return false;
            }
            user.role = 'user';
            await user.save();
            return true;
        } catch(err: any) {
            console.log(err);
        }
    }

    @Mutation(type => Organization)
    @Authorized('ORGANIZATION')
    async updateOrganization(
        @Arg('data', type => UpdateOrganizationInput) data: UpdateOrganizationInput,
        @Ctx() { req }: IContext
    ): Promise<Organization | undefined> {
        const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ 'user', 'organization' ] });
        if(!orgTeamMember) {
            return;
        }

        const org: Organization | undefined = await Organization.findOne(orgTeamMember.organization.id);
        if(!org) {
            return;
        }

        org.name = data.name || org.name;
        org.description = data.description || org.description;
        org.contactNo = data.contactNo || org.contactNo;
        org.email = data.email || org.email;
        org.photo = data.photo || org.photo;
        
        await org.save();
        org.photo = org.photo.toString();
        return org;
    } 
}