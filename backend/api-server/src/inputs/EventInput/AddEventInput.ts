import { Field, InputType } from "type-graphql";

@InputType()
export class AddEventInput {
   
    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    city: string;

    @Field()
    state: string;

    @Field()
    country: string;

    @Field()
    venue: string;

    @Field()
    category: string;

    @Field()
    geoLatLng: string;
}