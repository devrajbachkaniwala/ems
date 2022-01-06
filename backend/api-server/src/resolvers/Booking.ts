import { ApolloError } from "apollo-server-express";
import { Arg, Authorized, Ctx, FieldResolver, ID, Mutation, Query, Resolver, Root } from "type-graphql";
import { DeleteResult, Not } from "typeorm";
import { Booking } from "../entity/Booking";
import { BookingItem } from "../entity/BookingItem";
import { Event } from "../entity/Event";
import { EventPrice } from "../entity/EventPrice";
import { EventTiming } from "../entity/EventTiming";
import { Organization } from "../entity/Organization";
import { User } from "../entity/User";
import { AddBookingInput } from "../inputs/BookingInput/AddBookingInput";
import { IContext } from "../interface/IContext";

@Resolver(of => Booking)
export class BookingResolver {

    /* 
     *
     * Query
     * 
    */

    @Query(type => [Booking], { nullable: true })
    @Authorized('USER')
    async myBookings(
        @Ctx() { req }: IContext
    ): Promise<Booking[] | undefined> {
        try {
            return await Booking.find({ where: { user: { id: req.userId } }, relations: [ 'user', 'event', 'bookingItem' ] });
        } catch(err: any) {
            console.log(err);
        }
    }

    @Query(type => Booking, { nullable: true })
    @Authorized('USER')
    async bookingById(
        @Arg('bookingId', type => ID) bookingId: number,
        @Ctx() { req }: IContext
    ): Promise<Booking | undefined> {
        try {
            return await Booking.findOne({ where: { id: bookingId, user: { id: req.userId } }, relations: [ 'user', 'event', 'bookingItem' ] });
        } catch(err: any) {
            console.log(err);
        }
    }

    /* 
     *
     * Mutation
     * 
    */

    // insert data in booking and bookingItem table one after another
    @Mutation(type => Booking)
    @Authorized('USER')
    async addBooking(
        @Arg('data', type => AddBookingInput) data: AddBookingInput,
        @Ctx() { req }: IContext
    ): Promise<Booking | undefined> {
        try {
            const organization: Organization | undefined = await Organization.findOne({ where: { id: data.orgId } });
    
            if(!organization) {
                throw new ApolloError('Organization not found');
            }

            const event: Event | undefined = await Event.findOne({ where: { id: data.eventId, organization: { id: organization.id } }, relations: [ 'organization' ] });
    
            if(!event) {
                throw new ApolloError('Event not found');
            }
    
            const eventPrice: EventPrice | undefined = await EventPrice.findOne({ where: { id: data.priceId, event: { id: event.id } }, relations: [ 'event' ] });
    
            if(!eventPrice) {
                throw new ApolloError('Event price not found');
            }
    
            const eventTiming: EventTiming | undefined = await EventTiming.findOne({ where: { id: data.timingId, event: { id: event.id } }, relations: [ 'event' ] });
    
            if(!eventTiming) {
                throw new ApolloError('Event timing not found');
            }
    
            const user: User | undefined = await User.findOne({ where: { id: req.userId } });
    
            if(!user) {
                throw new ApolloError('User not found');
            }
    
            const booking: Booking = await Booking.create({ user, event }).save();
            const bookingItem: BookingItem = await BookingItem.create({ qty: data.qty, booking, price: eventPrice, timing: eventTiming, organization }).save();
    
            return bookingItem.booking;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }
    
    @Mutation(type => Boolean)
    @Authorized('USER')
    async cancelBooking(
        @Arg('bookingId', type => ID) bookingId: number,
        @Ctx() { req }: IContext
    ): Promise<Boolean | undefined> {
        try {
            const bookingItem: BookingItem | undefined = await BookingItem.findOne({ where: { booking: { id: bookingId, user: { id: req.userId } }, status: Not('cancel') }, relations: [ 'booking', 'price', 'timing', 'organization' ] });
            if(!bookingItem) {
                throw new ApolloError(`User's booking not found or already cancelled`);
            }

            bookingItem.status = 'cancel';
            await bookingItem.save();
            return true;
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

    @FieldResolver(type => BookingItem)
    async bookingItem(
        @Root() parent: Booking
    ): Promise<BookingItem | undefined> {
        try {
            return await BookingItem.findOne({ where: { booking: { id: parent.id } }, relations: [ 'booking', 'price', 'organization', 'timing' ] });
        } catch(err: any) {
            console.log(err);
        }
    }
}