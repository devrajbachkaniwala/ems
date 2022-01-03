import { ApolloError } from "apollo-server-express";
import { Arg, Authorized, Ctx, FieldResolver, ID, Mutation, Query, Resolver, Root } from "type-graphql";
import { DeleteResult } from "typeorm";
import { Event } from "../entity/Event";
import { EventPhoto } from "../entity/EventPhoto";
import { Organization } from "../entity/Organization";
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
        @Arg('photoId', type => ID) photoId: number
    ): Promise<EventPhoto | undefined> {
        try {
            return await EventPhoto.findOne({ where: { id: photoId }, relations: [ 'event' ] });
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
        @Arg('photo', type => String) photo: string
    ): Promise<EventPhoto | undefined> {
        try {
            const event: Event | undefined = await Event.findOne(eventId);
            if(!event) {
                throw new ApolloError('Event not found');
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
    ): Promise<Boolean | undefined> {
        try {
            const eventPhoto: DeleteResult | undefined = await EventPhoto.delete(photoId);
    
            if(!eventPhoto.affected) {
                throw new ApolloError('Photo already deleted');
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
        @Arg('photo', type => String) photo: string
    ): Promise<EventPhoto | undefined> {
        try {
            const eventPhoto: EventPhoto | undefined = await EventPhoto.findOne(photoId);
    
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