import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
    @Field(type => String, { nullable: true })
    username?: string;

    @Field(type => String, { nullable: true })
    userPhoto?: string;

    @Field(type => String, { nullable: true })
    fullName?: string;
    
    @Field(type => String, { nullable: true })
    role?: 'user' | 'organization';
}