import { ApolloError } from "apollo-server-express";
import { Arg, Authorized, Ctx, FieldResolver, ID, Mutation, Query, Resolver, Root } from "type-graphql";
import { DeleteResult } from "typeorm";
import { BookingItem } from "../entity/BookingItem";
import { Event } from "../entity/Event";
import { EventPrice } from "../entity/EventPrice";
import { OrganizationTeamMember } from "../entity/OrganizationTeamMember";
import { AddEventPriceInput } from "../inputs/EventPriceInput/AddEventPriceInput";
import { UpdateEventPriceInput } from "../inputs/EventPriceInput/UpdateEventPriceInput";
import { IContext } from "../interface/IContext";

@Resolver(of => EventPrice)
export class EventPriceResolver {
    /* 
     * 
     * Query
     * 
    */

    @Query(type => [EventPrice], { nullable: true })
    async eventPricesByEventId(
        @Arg('eventId', type => ID) eventId: number
    ): Promise<EventPrice[] | undefined> {
        try {
            return await EventPrice.find({ where: { event: { id: eventId } }, relations: [ 'event' ] });
        } catch(err: any) {
            console.log(err);
        }
    }

    @Query(type => EventPrice, { nullable: true })
    async eventPriceById(
        @Arg('priceId', type => ID) priceId: number,
        @Arg('eventId', type => ID) eventId: number
    ): Promise<EventPrice | undefined> {
        try {
            return await EventPrice.findOne({ where: { id: priceId, event: { id: eventId } } , relations: [ 'event' ] });
        } catch(err: any) {
            console.log(err);
        }
    }

    /* 
     * 
     * Mutation
     * 
    */

    @Mutation(type => EventPrice)
    @Authorized('ORGANIZATION')
    async addEventPriceByEventId(
        @Arg('eventId', type => ID) eventId: number,
        @Arg('data', type => AddEventPriceInput) data: AddEventPriceInput,
        @Ctx() { req }: IContext
    ): Promise<EventPrice | undefined> {
        try {
            const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ 'user', 'organization' ] });
            if(!orgTeamMember) {
                throw new ApolloError('Requested user does not belong to the organization');
            }

            const event: Event | undefined = await Event.findOne({ where: { id: eventId, organization: { id: orgTeamMember.organization.id } }, relations: [ 'organization' ] });
            if(!event) {
                throw new ApolloError('Event does not belong to the organization');
            }
            const eventPrice: EventPrice = await EventPrice.create({ ...data, event }).save();
            return eventPrice;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }
    
    @Mutation(type => EventPrice)
    @Authorized('ORGANIZATION')
    async updateEventPriceById(
        @Arg('priceId', type => ID) priceId: number,
        @Arg('data', type => UpdateEventPriceInput) data: UpdateEventPriceInput,
        @Arg('eventId', type => ID) eventId: number,
        @Ctx() { req }: IContext
    ): Promise<EventPrice | undefined> {
        try {
            const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ 'user', 'organization' ] });
            if(!orgTeamMember) {
                throw new ApolloError('Requested user does not belong to the organization');
            }

            const event: Event | undefined = await Event.findOne({ where: { id: eventId, organization: { id: orgTeamMember.organization.id } }, relations: [ 'organization' ] });
            if(!event) {
                throw new ApolloError('Event does not belong to the organization');
            }
            
            const eventPrice: EventPrice | undefined = await EventPrice.findOne({ where: { id: priceId, event: { id: event.id } }, relations: [ 'event' ] });
            if(!eventPrice) {
                throw new ApolloError('Event price not found');
            }

            eventPrice.price = data.price || eventPrice.price;
            eventPrice.currency = data.currency || eventPrice.currency;
            eventPrice.maxLimit = data.maxLimit || eventPrice.maxLimit;

            await eventPrice.save();
            return eventPrice;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }
    
    @Mutation(type => Boolean)
    @Authorized('ORGANIZATION')
    async removeEventPriceById(
        @Arg('priceId', type => ID) priceId: number,
        @Arg('eventId', type => ID) eventId: number,
        @Ctx() { req }: IContext
    ): Promise<Boolean | undefined> {
        try {
            const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ 'user', 'organization' ] });
            if(!orgTeamMember) {
                throw new ApolloError('Requested user does not belong to the organization');
            }

            const event: Event | undefined = await Event.findOne({ where: { id: eventId, organization: { id: orgTeamMember.organization.id } }, relations: [ 'organization' ] });
            if(!event) {
                throw new ApolloError('Event does not belong to the organization');
            }

            const eventPrice: DeleteResult | undefined = await EventPrice.delete({ id: priceId, event: { id: event.id } });
            if(!eventPrice.affected) {
                throw new ApolloError('Event price not found');
            }
            return true;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }

    @FieldResolver(type => [BookingItem], { nullable: true })
    async bookingItems(
        @Root() parent: EventPrice
    ): Promise<BookingItem[] | undefined> {
        try {
            return await BookingItem.find({ where: { price: { id: parent.id } }, relations: [ 'booking', 'price', 'timing', 'organization' ] });
        } catch(err: any) {
            console.log(err);
        }
    }
}