import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateEventInput {
   
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    city?: string;

    @Field({ nullable: true })
    state?: string;

    @Field({ nullable: true })
    country?: string;

    @Field({ nullable: true })
    venue?: string;

    @Field({ nullable: true })
    category?: string;

    @Field({ nullable: true })
    geoLatLng?: string;
}