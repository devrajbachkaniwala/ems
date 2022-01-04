import { Field, InputType, Int } from "type-graphql";

@InputType()
export class UpdateEventPriceInput {

    @Field(type => Int, { nullable: true })
    price?: number;

    @Field(type => String, { nullable: true })
    currency?: string;

    @Field(type => Int, { nullable: true })
    maxLimit?: number;
}