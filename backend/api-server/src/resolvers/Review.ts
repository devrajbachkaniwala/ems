import { ApolloError } from "apollo-server-express";
import { Arg, Authorized, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { DeleteResult } from "typeorm";
import { Event } from "../entity/Event";
import { Review } from "../entity/Review";
import { User } from "../entity/User";
import { AddReviewInput } from "../inputs/ReviewInput/AddReviewInput";
import { UpdateReviewInput } from "../inputs/ReviewInput/UpdateReviewInput";
import { IContext } from "../interface/IContext";

@Resolver()
export class ReviewResolver {

    /* 
     *
     * Query
     * 
    */

    @Query(type => [Review], { nullable: true })
    async reviewsByEventId(
        @Arg('eventId', type => ID) eventId: number
    ): Promise<Review[] | undefined> {
        try {
            return await Review.find({ where: { event: { id: eventId } }, relations: [ 'event', 'user' ] });
        } catch(err: any) {
            console.log(err);
        }
    }
    
    @Query(type => Review, { nullable: true })
    async reviewById(
        @Arg('reviewId', type => ID) reviewId: number
    ): Promise<Review | undefined> {
        try {
            return await Review.findOne({ where: { id: reviewId }, relations: [ 'event', 'user' ] });
        } catch(err: any) {
            console.log(err);
        }
    }

    /* 
     *
     * Mutation
     * 
    */

    @Mutation(type => Review)
    @Authorized('USER')
    async addReviewByEventId(
        @Arg('eventId', type => ID) eventId: number,
        @Arg('data', type => AddReviewInput) data: AddReviewInput,
        @Ctx() { req }: IContext
    ): Promise<Review | undefined> {
        try {
            const user: User | undefined = await User.findOne(req.userId);
    
            if(!user) {
                throw new ApolloError('User not found');
            }
    
            const event: Event | undefined = await Event.findOne(eventId)
            
            if(!event) {
                throw new ApolloError('Event not found');
            }
    
            const review: Review = await Review.create({ ...data, user, event }).save();
            return review;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }
    
    @Mutation(type => Review)
    @Authorized('USER')
    async updateReviewById(
        @Arg('reviewId', type => ID) reviewId: number,
        @Arg('data', type => UpdateReviewInput) data: UpdateReviewInput,
        @Ctx() { req }: IContext
    ): Promise<Review | undefined> {
        try {
            const review: Review | undefined = await Review.findOne({ where: { id: reviewId, user: { id: req.userId } }, relations: [ 'user', 'event' ] });
            if(!review) {
                throw new ApolloError('Review not found');
            }
    
            review.description = data.description || review.description;
            review.star = data.star || review.star;
    
            await review.save();
            return review;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }

    @Mutation(type => Boolean)
    @Authorized('USER')
    async removeReviewById(
        @Arg('reviewId', type => ID) reviewId: number,
        @Ctx() { req }: IContext
    ): Promise<Boolean | undefined> {
        try {
            const review: DeleteResult | undefined = await Review.delete({ id: reviewId, user: { id: req.userId } });
            
            if(!review.affected) {
                throw new ApolloError('Review not found');
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