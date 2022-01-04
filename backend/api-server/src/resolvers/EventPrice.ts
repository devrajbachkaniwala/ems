import { ApolloError } from "apollo-server-express";
import { Arg, Authorized, ID, Mutation, Query, Resolver } from "type-graphql";
import { DeleteResult } from "typeorm";
import { Event } from "../entity/Event";
import { EventPrice } from "../entity/EventPrice";
import { AddEventPriceInput } from "../inputs/EventPriceInput/AddEventPriceInput";
import { UpdateEventPriceInput } from "../inputs/EventPriceInput/UpdateEventPriceInput";

@Resolver()
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
        @Arg('priceId', type => ID) priceId: number
    ): Promise<EventPrice | undefined> {
        try {
            return await EventPrice.findOne({ where: { id: priceId } , relations: [ 'event' ] });
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
    async addPriceByEventId(
        @Arg('eventId', type => ID) eventId: number,
        @Arg('data', type => AddEventPriceInput) data: AddEventPriceInput
    ): Promise<EventPrice | undefined> {
        try {
            const event: Event | undefined = await Event.findOne(eventId);
            if(!event) {
                throw new ApolloError('Event not found');
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
    async updatePriceById(
        @Arg('priceId', type => ID) priceId: number,
        @Arg('data', type => UpdateEventPriceInput) data: UpdateEventPriceInput
    ): Promise<EventPrice | undefined> {
        try {
            const eventPrice: EventPrice | undefined = await EventPrice.findOne(priceId);
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
    async removePriceById(
        @Arg('priceId', type => ID) priceId: number
    ): Promise<Boolean | undefined> {
        try {
            const eventPrice: DeleteResult | undefined = await EventPrice.delete(priceId);
            if(!eventPrice.affected) {
                throw new ApolloError('Event price already deleted');
            }
            return true;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }

}