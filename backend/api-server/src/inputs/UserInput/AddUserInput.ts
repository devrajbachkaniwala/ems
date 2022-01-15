import { Field, InputType } from "type-graphql";

@InputType()
export class AddUserInput {
    @Field(type => String)
    username: string;

    @Field(type => String)
    userPhoto: string;

    @Field(type => String)
    fullName: string;

    @Field(type => String)
    email: string;

    @Field(type => String)
    password: string;
    
}