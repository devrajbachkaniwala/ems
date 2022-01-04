import { Field, ID, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookingItem } from "./BookingItem";
import { Event } from "./Event";

@ObjectType()
@Entity({ name: 'eventprices' })
export class EventPrice extends BaseEntity {
    
    @Field(type => ID)
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Field(type => Int)
    @Column({ type: 'int' })
    price: number;

    @Field(type => String)
    @Column({ type: 'varchar', length: 100 })
    currency: string;

    @Field(type => Int)
    @Column({ type: 'int', default: 0 })
    maxLimit: number;

    @Field(type => Int)
    @Column({ type: 'int', default: 0 })
    sold: number;

    @Field(type => Event)
    @ManyToOne(() => Event, event => event.prices, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    event: Event;

    @OneToMany(() => BookingItem, bookingItem => bookingItem.price)
    bookingItems: BookingItem[];
}