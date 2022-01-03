import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateEventTimingInput {
   
    @Field(type => String, { nullable: true })
    date?: String;

    @Field(type => String, { nullable: true })
    startTime?: string;

    @Field(type => String, { nullable: true })
    endTime?: string;
}