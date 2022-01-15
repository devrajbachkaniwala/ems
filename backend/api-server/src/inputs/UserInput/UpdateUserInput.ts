import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateUserInput {
    @Field(type => String, { nullable: true })
    username?: string;

    @Field(type => String, { nullable: true })
    userPhoto?: string;

    @Field(type => String, { nullable: true })
    fullName?: string;
    
}