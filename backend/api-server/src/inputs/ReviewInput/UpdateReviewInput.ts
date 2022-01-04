import { Field, InputType, Int } from "type-graphql";

@InputType()
export class UpdateReviewInput {

    @Field(type => String, { nullable: true })
    description?: string;

    @Field(type => Int, { nullable: true })
    star?: number;
}