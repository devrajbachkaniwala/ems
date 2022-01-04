import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookingItem } from "./BookingItem";
import { Event } from "./Event";

@ObjectType()
@Entity({ name: 'eventtimings' })
export class EventTiming extends BaseEntity {

    @Field(type => ID)
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Field(type => String)
    @Column({ type: 'date' })
    date: String;

    @Field(type => String)
    @Column({ type: 'time' })
    startTime: string;

    @Field(type => String)
    @Column({ type: 'time' })
    endTime: string;

    @Field(type => Event)
    @ManyToOne(() => Event, event => event.timings, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    event: Event;

    @OneToMany(() => BookingItem, bookingItem => bookingItem.timing)
    bookingItems: BookingItem[];
}