import { ApolloError } from "apollo-server-express";
import { Arg, Authorized, Ctx, FieldResolver, ID, Mutation, Query, Resolver, Root } from "type-graphql";
import { DeleteResult, ILike, Like } from "typeorm";
import { Booking } from "../entity/Booking";
import { Event } from "../entity/Event";
import { EventPhoto } from "../entity/EventPhoto";
import { EventPrice } from "../entity/EventPrice";
import { EventTiming } from "../entity/EventTiming";
import { Organization } from "../entity/Organization";
import { OrganizationTeamMember } from "../entity/OrganizationTeamMember";
import { Review } from "../entity/Review";
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
            return await Event.find({ relations: [ 'organization' ], order: { createdAt: 'DESC' } });
        } catch(err: any) {
            console.log(err);
        }
    }

    @Query(type => Event, { nullable: true })
    async eventById(@Arg('eventId', type => ID) eventId: number): Promise<Event | undefined> {
        try {
            return await Event.findOne({ where: { id: eventId }, relations: [ 'organization' ] });
        } catch(err: any) {
            console.log(err);
        }
    }
    
    @Query(type => [Event], { nullable: true })
    async searchEventsByName(@Arg('name', type => String) name: string): Promise<Event[] | undefined> {
        try {
            return await Event.find({ where: { name: ILike(`%${name}%`) }, relations: [ 'organization' ] });
        } catch(err: any) {
            console.log(err);
        }
    }
    
    @Query(type => [Event], { nullable: true })
    async searchEventsByCategory(@Arg('category', type => String) category: string): Promise<Event[] | undefined> {
        try {
            return await Event.find({ where: { category: ILike(`%${category}%`) }, relations: [ 'organization' ] });
        } catch(err: any) {
            console.log(err);
        }
    }

    @Query(type => [Event], { nullable: true })
    async trendingEvents(): Promise<Event[] | undefined> {
        try {
            const eventPrice: EventPrice[] | undefined = await EventPrice.find({ relations: [ 'event' ], order: { sold: 'DESC' } });
            const events: Event[] = eventPrice.map( price => price.event );
            return events;
        } catch(err: any) {
            console.log(err);
        }
    }

    @Query(type => [Event], { nullable: true })
    async eventsByLocation(
        @Arg('geoLatLng', type => String) geoLatLng: string
    ): Promise<Event[] | undefined> {
        try {
            return await Event.find({ where: { geoLatLng }, relations: [ 'organization' ] });
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
        @Arg('data', type => AddEventInput) data: AddEventInput,
        @Ctx() { req }: IContext
    ): Promise<Event | undefined> {
        try {
            const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ 'user', 'organization' ] });
            if(!orgTeamMember) {
                throw new ApolloError('Requested user does not belong to the organization');
            }

            const organization: Organization | undefined = await Organization.findOne({ where: { id: orgTeamMember.organization.id } });
            if(!organization) {
                throw new ApolloError('Organization not found');
            }
    
            const event: Event = await Event.create({ ...data, organization }).save();
        
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
    async deleteEventById(
        @Arg('eventId', type => ID) eventId: number,
        @Ctx() { req }: IContext
    ): Promise<Boolean | undefined> {
        try {
            const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ 'user', 'organization' ] });
            if(!orgTeamMember) {
                throw new ApolloError('Requested user does not belong to the organization');
            }

            const event: DeleteResult | undefined = await Event.delete({ id: eventId, organization: { id: orgTeamMember.organization.id } });
            if(!event.affected) {
                throw new ApolloError('Event not found');
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
    async updateEventById(
        @Arg('eventId', type => ID) eventId: number,
        @Arg('data', type => UpdateEventInput) data: UpdateEventInput,
        @Ctx() { req }: IContext
    ): Promise<Event | undefined> {
        try {
            const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ 'user', 'organization' ] });
            if(!orgTeamMember) {
                throw new ApolloError('Requested user does not belong to the organization');
            }

            const event: Event | undefined = await Event.findOne({ where: { id: eventId, organization: { id: orgTeamMember.organization.id } }, relations: [ 'organization' ] });

            if(!event) {
                throw new ApolloError('Event does not belong to the organization');
            }

            event.name = data.name || event.name;
            event.description = data.description || event.description;
            event.city = data.city || event.city;
            event.state = data.state || event.state;
            event.country = data.country || event.country;
            event.venue = data.venue || event.venue;
            event.category = data.category || event.category;

            if(!data.geoLatLng) {
                const geoLocation: { x: number, y: number } = (event.geoLatLng as any);
                event.geoLatLng = `(${geoLocation.x},${geoLocation.y})`;
            } else {
                event.geoLatLng = data.geoLatLng;
            }

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

    @FieldResolver(type => [EventPrice], { nullable: true })
    async prices(
        @Root() parent: Event
    ): Promise<EventPrice[] | undefined> {
        try {
            return await EventPrice.find({ where: { event: { id: parent.id } }, relations: [ 'event' ] });
        } catch(err: any) {
            console.log(err);
        }
    }

    @FieldResolver(type => [Review], { nullable: true })
    async reviews(
        @Root() parent: Event
    ): Promise<Review[] | undefined> {
        try {
            return await Review.find({ where: { event: { id: parent.id } }, relations: [ 'event', 'user' ] });
        } catch(err: any) {
            console.log(err);
        }
    }
    
    @FieldResolver(type => [Booking], { nullable: true })
    async bookings(
        @Root() parent: Event
    ): Promise<Booking[] | undefined> {
        try {
            return await Booking.find({ where: { event: { id: parent.id } }, relations: [ 'user', 'event', 'bookingItem' ], order: { createdAt: 'DESC' } });
        } catch(err: any) {
            console.log(err);
        }
    }
}