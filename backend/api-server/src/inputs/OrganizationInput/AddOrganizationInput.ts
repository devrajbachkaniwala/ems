import { Field, InputType, Int } from "type-graphql";

@InputType()
export class AddOrganizationInput {
    
    @Field(type => String)
    name: string;

    @Field(type => String)
    description: string;

    @Field(type => Int)
    contactNo: number;

    @Field(type => String)
    email: string;

    @Field(type => String)
    photo: string;
}