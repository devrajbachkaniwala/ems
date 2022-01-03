import { Field, InputType } from "type-graphql";

@InputType()
export class AddEventTimingInput {
   
    @Field(type => String)
    date: String;

    @Field(type => String)
    startTime: string;

    @Field(type => String)
    endTime: string;
}