import { ApolloError } from "apollo-server-express";
import { Arg, Authorized, Ctx, FieldResolver, ID, Mutation, Query, Resolver, Root } from "type-graphql";
import { DeleteResult } from "typeorm";
import { Event } from "../entity/Event";
import { EventPhoto } from "../entity/EventPhoto";
import { Organization } from "../entity/Organization";
import { OrganizationTeamMember } from "../entity/OrganizationTeamMember";
import { IContext } from "../interface/IContext";

@Resolver(of => EventPhoto)
export class EventPhotoResolver {

    /* 
     *
     * Query
     * 
    */

    @Query(type => [EventPhoto], { nullable: true })
    async eventPhotosByEventId(
        @Arg('eventId', type => ID) eventId: number
    ): Promise<EventPhoto[] | undefined> {
        try {
            return await EventPhoto.find({ where: { event: {  id: eventId } }, relations: [ 'event' ] });
        } catch(err: any) {
            console.log(err);
        }
    }
    
    @Query(type => EventPhoto, { nullable: true })
    async eventPhotoById(
        @Arg('photoId', type => ID) photoId: number,
        @Arg('eventId', type => ID) eventId: number
    ): Promise<EventPhoto | undefined> {
        try {
            return await EventPhoto.findOne({ where: { id: photoId, event: { id: eventId } }, relations: [ 'event' ] });
        } catch(err: any) {
            console.log(err);
        }
    }

    /* 
     *
     * MUTATION
     * 
    */

    @Mutation(type => EventPhoto)
    @Authorized('ORGANIZATION')
    async addEventPhotoByEventId(
        @Arg('eventId', type => ID) eventId: number,
        @Arg('photo', type => String) photo: string,
        @Ctx() { req }: IContext
    ): Promise<EventPhoto | undefined> {
        try {
            const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ 'user', 'organization' ] });
            if(!orgTeamMember) {
                throw new ApolloError('Requested user does not belong to the organization');
            }

            const event: Event | undefined = await Event.findOne({ where: { id: eventId, organization: { id: orgTeamMember.organization.id } }, relations: [ 'organization' ] });
            if(!event) {
                throw new ApolloError('Event does not belong to the organization');
            }
    
            const eventPhoto: EventPhoto = await EventPhoto.create({ photo, event }).save();
    
            return eventPhoto;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }
    
    @Mutation(type => Boolean)
    @Authorized('ORGANIZATION')
    async removeEventPhotoById(
        @Arg('photoId', type => ID) photoId: number,
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

            const eventPhoto: DeleteResult | undefined = await EventPhoto.delete({ id: photoId, event: { id: event.id } });
    
            if(!eventPhoto.affected) {
                throw new ApolloError('Event photo not found');
            }
    
            return true;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }
    
    @Mutation(type => EventPhoto)
    @Authorized('ORGANIZATION')
    async updateEventPhotoById(
        @Arg('photoId', type => ID) photoId: number,
        @Arg('photo', type => String) photo: string,
        @Arg('eventId', type => ID) eventId: number,
        @Ctx() { req }: IContext
    ): Promise<EventPhoto | undefined> {
        try {
            const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: req.userId } }, relations: [ 'user', 'organization' ] });
            if(!orgTeamMember) {
                throw new ApolloError('Requested user does not belong to the organization');
            }

            const event: Event | undefined = await Event.findOne({ where: { id: eventId, organization: { id: orgTeamMember.organization.id } }, relations: [ 'organization' ] });
            if(!event) {
                throw new ApolloError('Event does not belong to the organization');
            }

            const eventPhoto: EventPhoto | undefined = await EventPhoto.findOne({ where: { id: photoId, event: { id: event.id } }, relations: [ 'event' ] });
    
            if(!eventPhoto) {
                throw new ApolloError('Event photo not found');
            }
    
            eventPhoto.photo = photo;
            await eventPhoto.save();
            return eventPhoto;
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
    photo(@Root() parent: EventPhoto): string {
        return parent.photo.toString();
    }
}