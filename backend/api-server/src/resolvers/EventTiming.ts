import { ApolloError } from "apollo-server-express";
import { Arg, Authorized, Ctx, FieldResolver, ID, Mutation, Query, Resolver } from "type-graphql";
import { DeleteResult } from "typeorm";
import { Event } from "../entity/Event";
import { EventTiming } from "../entity/EventTiming";
import { Organization } from "../entity/Organization";
import { OrganizationTeamMember } from "../entity/OrganizationTeamMember";
import { AddEventTimingInput } from "../inputs/EventTimingInput/AddEventTimingInput";
import { UpdateEventTimingInput } from "../inputs/EventTimingInput/UpdateEventTimingInput";
import { IContext } from "../interface/IContext";

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
        @Arg('timingId', type => ID) timingId: number,
        @Arg('eventId', type => ID) eventId: number
    ): Promise<EventTiming | undefined> {
        try {
            return await EventTiming.findOne({ where: { id: timingId, event: { id: eventId } } , relations: [ 'event' ] });
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
        @Arg('data', type => AddEventTimingInput) data: AddEventTimingInput,
        @Ctx() { req }: IContext
    ): Promise<EventTiming | undefined> {
        try {
            const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: req.userId }, relations: [ 'organization', 'user' ] });
            if(!orgTeamMember) {
                throw new ApolloError('Requested user does not belong to the organization');
            }

            const event: Event | undefined = await Event.findOne({ where: { id: eventId, organization: { id: orgTeamMember.organization.id } }, relations: [ 'organization' ] });
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
        @Arg('data', type => UpdateEventTimingInput) data: UpdateEventTimingInput,
        @Arg('eventId', type => ID) eventId: number,
        @Ctx() { req }: IContext
    ): Promise<EventTiming | undefined> {
        try {
            const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ 'user', 'organization' ] });
            if(!orgTeamMember) {
                throw new ApolloError('Requested user is not a part of an organization');
            }

            const event: Event | undefined = await Event.findOne({ where: { id: eventId, organization: { id: orgTeamMember.organization.id } }, relations: [ 'organization' ] });

            if(!event) {
                throw new ApolloError('Event does not belong to the organization');
            }

            const eventTiming: EventTiming | undefined = await EventTiming.findOne({ where: { id: timingId, event: { id: event.id } }, relations: [ 'event' ] });
    
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
        @Arg('timingId', type => ID) timingId: number,
        @Arg('eventId', type => ID) eventId: number,
        @Ctx() { req }: IContext
    ): Promise<Boolean | undefined> {
        try {
            const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ 'user', 'organization' ] });
            if(!orgTeamMember) {
                throw new ApolloError('Requested user is not a part of an organization');
            }

            const event: Event | undefined = await Event.findOne({ where: { id: eventId, organization: { id: orgTeamMember.organization.id } }, relations: [ 'organization' ] });

            if(!event) {
                throw new ApolloError('Event does not belong to the organization');
            }

            const eventTiming: DeleteResult | undefined = await EventTiming.delete({ id: timingId, event: { id: event.id } });
            
            if(!eventTiming.affected) {
                throw new ApolloError('Event timing not found');
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