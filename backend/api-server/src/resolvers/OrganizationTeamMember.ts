import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { OrganizationTeamMember } from "../entity/OrganizationTeamMember";

@Resolver()
export class OrganizationTeamMemberResolver {
    @Query(() => [OrganizationTeamMember])
    @Authorized('USER')
    async teamMember(@Ctx() { req }: { req: any } ) {
        return await OrganizationTeamMember.find({ where: { user: { id: req.userId } }, relations: [ "user", "organization" ] })
    }
}