import { Field, InputType, Int } from "type-graphql";

@InputType()
export class UpdateOrganizationInput {
    
    @Field(type => String, { nullable: true })
    name?: string;

    @Field(type => String, { nullable: true })
    description?: string;

    @Field(type => Int, { nullable: true })
    contactNo?: number;

    @Field(type => String, { nullable: true })
    email?: string;

    @Field(type => String, { nullable: true })
    photo?: string;
}