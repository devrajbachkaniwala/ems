import { Field, ID, InputType, Int } from "type-graphql";

@InputType()
export class AddBookingInput {
    @Field(type => ID)
    eventId: number;
    
    @Field(type => ID)
    priceId: number;
    
    @Field(type => ID)
    timingId: number;

    @Field(type => ID)
    orgId: number;
    
    @Field(type => Int)
    qty: number;
}