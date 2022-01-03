import { ApolloError } from "apollo-server-express";
import { Arg, Authorized, FieldResolver, ID, Mutation, Query, Resolver } from "type-graphql";
import { DeleteResult } from "typeorm";
import { Event } from "../entity/Event";
import { EventTiming } from "../entity/EventTiming";
import { AddEventTimingInput } from "../inputs/EventTimingInput/AddEventTimingInput";
import { UpdateEventTimingInput } from "../inputs/EventTimingInput/UpdateEventTimingInput";

@Resolver()
export class EventTimingResolver {
    /* 
     *
     * Query
     * 
    */

    @Query(type => [EventTiming], { nullable: true })
    async eventTimingsByEventId(
        @Arg('eventId', type => ID) eventId: number
    ): Promise<EventTiming[] | undefined> {
        try {
            return await EventTiming.find({ where: { event: { id: eventId } }, relations: [ 'event' ] });
        } catch(err: any) {
            console.log(err);
        }
    }
   
    @Query(type => EventTiming, { nullable: true })
    async eventTimingById(
        @Arg('timingId', type => ID) timingId: number
    ): Promise<EventTiming | undefined> {
        try {
            return await EventTiming.findOne({ where: { id: timingId } , relations: [ 'event' ] });
        } catch(err: any) {
            console.log(err);
        }
    }
    
    
    /* 
     *
     * Mutation
     * 
    */

    @Mutation(type => EventTiming)
    @Authorized('ORGANIZATION')
    async addEventTimingByEventId(
        @Arg('eventId', type => ID) eventId: number,
        @Arg('data', type => AddEventTimingInput) data: AddEventTimingInput
    ): Promise<EventTiming | undefined> {
        try {
            const event: Event | undefined = await Event.findOne(eventId);

            if(!event) {
                throw new ApolloError('Event not found');
            }

            const eventTiming: EventTiming = await EventTiming.create({ ...data, event }).save();
            return eventTiming;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }
    
    @Mutation(type => EventTiming)
    @Authorized('ORGANIZATION')
    async updateEventTimingById(
        @Arg('timingId', type => ID) timingId: number,
        @Arg('data', type => UpdateEventTimingInput) data: UpdateEventTimingInput
    ): Promise<EventTiming | undefined> {
        try {
            const eventTiming: EventTiming | undefined = await EventTiming.findOne(timingId);
    
            if(!eventTiming) {
                throw new ApolloError('Event timing not found');
            }
    
            eventTiming.date = data.date || eventTiming.date;
            eventTiming.startTime = data.startTime || eventTiming.startTime;
            eventTiming.endTime = data.endTime || eventTiming.endTime;
    
            await eventTiming.save();
            return eventTiming;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }

    @Mutation(type => Boolean)
    @Authorized('ORGANIZATION')
    async removeEventTimingById(
        @Arg('timingId', type => ID) timingId: number
    ): Promise<Boolean | undefined> {
        try {
            const timing = await EventTiming.findOne({ relations: [ 'event' ], where: { id: timingId } });
            if(!timing) {
                throw new ApolloError('Event timing already deleted');
            }

            const eventTiming: DeleteResult | undefined = await EventTiming.delete(timingId);
            
            if(!eventTiming.affected) {
                throw new ApolloError('Event timing already deleted');
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