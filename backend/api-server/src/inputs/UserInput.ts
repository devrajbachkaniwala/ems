import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
    @Field({ nullable: true })
    username?: string;

    @Field({ nullable: true })
    userPhoto?: string;

    @Field({ nullable: true })
    fullName?: string;
}