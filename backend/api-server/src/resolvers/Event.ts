import { ApolloError } from "apollo-server-express";
import { Arg, Authorized, Ctx, FieldResolver, ID, Mutation, Query, Resolver, Root } from "type-graphql";
import { DeleteResult, Like } from "typeorm";
import { Event } from "../entity/Event";
import { EventPhoto } from "../entity/EventPhoto";
import { EventTiming } from "../entity/EventTiming";
import { Organization } from "../entity/Organization";
import { OrganizationTeamMember } from "../entity/OrganizationTeamMember";
import { AddEventInput } from "../inputs/EventInput/AddEventInput";
import { UpdateEventInput } from "../inputs/EventInput/UpdateEventInput";
import { IContext } from "../interface/IContext";

@Resolver(of => Event)
export class EventResolver {
    
    /* 
     *
     * USER ROLE
     * 
    */
    
    @Query(type => [Event], { nullable: true })
    async events(): Promise<Event[] | undefined> {
        try {
            return await Event.find({ relations: [ 'organization' ] });
        } catch(err: any) {
            console.log(err);
        }
    }

    @Query(type => Event, { nullable: true })
    async eventById(@Arg('id', type => ID) eventId: number): Promise<Event | undefined> {
        try {
            return await Event.findOne({ where: { id: eventId }, relations: [ 'organization' ] });
        } catch(err: any) {
            console.log(err);
        }
    }
    
    @Query(type => [Event], { nullable: true })
    async searchEventByName(@Arg('name', type => String) name: string): Promise<Event[] | undefined> {
        try {
            return await Event.find({ where: { name: Like(`%${name}%`) }, relations: [ 'organization' ] });
        } catch(err: any) {
            console.log(err);
        }
    }

    /* 
     *
     * ORGANIZATION ROLE
     * 
    */

    @Mutation(type => Event)
    @Authorized('ORGANIZATION')
    async createEvent(
        @Arg('orgId', type => ID) orgId: number,
        @Arg('data', type => AddEventInput) data: AddEventInput
    ) {
        try {
            const organization: Organization | undefined = await Organization.findOne(orgId);
            if(!organization) {
                throw new ApolloError('Organization not found');
            }
    
            const event: Event | undefined = await Event.create({ ...data, organization }).save();
            if(!event) {
                throw new ApolloError('Failed to create event');
            }
        
            return event;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }

    @Mutation(type => Boolean)
    @Authorized('ORGANIZATION')
    async deleteEvent(@Arg('id', type => ID) eventId: number): Promise<Boolean | undefined> {
        try {
            const event: DeleteResult | undefined = await Event.delete(eventId);
            if(!event.affected) {
                throw new ApolloError('Event already deleted');
            }
            return true;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }

    @Mutation(type => Event)
    @Authorized('ORGANIZATION')
    async updateEvent(
        @Arg('id', type => ID) eventId: number,
        @Arg('data', type => UpdateEventInput) data: UpdateEventInput
    ): Promise<Event | undefined> {
        try {
            const event = await Event.findOne(eventId);

            if(!event) {
                throw new ApolloError('Event not found');
            }

            event.name = data.name || event.name;
            event.description = data.description || event.description;
            event.city = data.city || event.city;
            event.state = data.state || event.state;
            event.country = data.country || event.country;
            event.venue = data.venue || event.venue;
            event.category = data.category || event.category;
            event.geoLatLng = data.geoLatLng || event.geoLatLng;

            await event.save();
            return event;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }

    /* 
     *
     * Field Resolver
     * 
    */

    @FieldResolver(type => String)
    geoLatLng(@Root() parent: Event): string {
        const geoLocation: { x: number, y: number } = (parent.geoLatLng as any);
        if(!geoLocation.x) {
            return parent.geoLatLng;
        }
        return `(${geoLocation.x}, ${geoLocation.y})`;
    }

    @FieldResolver(type => [EventPhoto], { nullable: true })
    async photos(
        @Root() parent: Event
    ): Promise<EventPhoto[] | undefined> {
        try {
            return await EventPhoto.find({ where: { event: { id: parent.id } }, relations: [ 'event' ] });
        } catch(err: any) {
            console.log(err);
        }
    }

    @FieldResolver(type => [EventTiming], { nullable: true })
    async timings(
        @Root() parent: Event
    ): Promise<EventTiming[] | undefined> {
        try {
            return await EventTiming.find({ where: { event: { id: parent.id } }, relations: [ 'event' ] });
        } catch(err: any) {
            console.log(err);
        }
    }

}