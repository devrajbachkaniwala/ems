import { Field, ID, InputType } from "type-graphql";
import { Organization } from "../entity/Organization";
import { User } from "../entity/User";

@InputType()
export class OrganizationTeamMemberInput {
    @Field(() => User)
    user: User;
    
    @Field(() => Organization)
    organization: Organization;
}