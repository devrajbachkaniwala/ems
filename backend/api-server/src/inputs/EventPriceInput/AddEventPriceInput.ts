import { Field, InputType, Int } from "type-graphql";

@InputType()
export class AddEventPriceInput {

    @Field(type => Int)
    price: number;

    @Field(type => String)
    currency: string;

    @Field(type => Int, { nullable: true })
    maxLimit?: number;
}