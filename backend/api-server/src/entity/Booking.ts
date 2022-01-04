import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BookingItem } from "./BookingItem";
import { Event } from "./Event";
import { User } from "./User";

@ObjectType()
@Entity({ name: 'bookings' })
export class Booking extends BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Field(type => Date)
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Field(type => Date)
    @UpdateDateColumn({ type: 'timestamptz' })
    modifiedAt: Date;

    @Field(type => User)
    @ManyToOne(() => User, user => user.bookings, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    user: User;

    @Field(type => Event)
    @ManyToOne(() => Event, event => event.bookings, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    event: Event;

    @OneToOne(() => BookingItem, bookingItem => bookingItem.booking)
    bookingItem: BookingItem;
}