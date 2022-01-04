import { Field, InputType, Int } from "type-graphql";

@InputType()
export class AddReviewInput {

    @Field(type => String)
    description: string;

    @Field(type => Int)
    star: number;
}