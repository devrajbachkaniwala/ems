import { Arg, Authorized, Ctx, FieldResolver, ID, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { Organization } from "../entity/Organization";
import { OrganizationTeamMember } from "../entity/OrganizationTeamMember";
import { User } from "../entity/User";
import { OrganizationTeamMemberInput } from "../inputs/OrganizationTeamMemberInput";
import { IContext } from "../interface/IContext";

@Resolver(of => Organization)
export class OrganizationTeamMemberResolver {

    /* @FieldResolver(type => Organization, { nullable: true })
    async organization(@Root() parent: User): Promise<Organization | undefined> {
        const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: parent.id } }, relations: [ 'user', 'organization' ] });
        return orgTeamMember?.organization;
    } */

    /* @Query(type => [OrganizationTeamMember])
    @Authorized('ORGANIZATION')
    async teamMembers(@Ctx() { req }: IContext ): Promise<OrganizationTeamMember[] | undefined> {
        try {
            return await OrganizationTeamMember.find({ relations: [ "user", "organization" ] })
        } catch(err: any) {
            console.log(err);
        }
    } */
    
    /* @Mutation(type => OrganizationTeamMember)
    @Authorized('ORGANIZATION')
    async addteamMember(
        @Root() parent: Organization,
        @Ctx() { req }: IContext, 
        @Arg('userId', type => Int) userId: number 
    ): Promise<OrganizationTeamMember | undefined> {
        try {
            const user: User | undefined = await User.findOne(userId);
            if(!user) {
                return;
            }
            if(user.role === 'organization') {
                return;
            }
        

            const newTeamMember = await OrganizationTeamMember.create({ user, organization: parent }).save();

            return newTeamMember;
        } catch(err: any) {
            console.log(err);
        }
    } */
}