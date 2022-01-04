import { Field, ID, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking";
import { EventPrice } from "./EventPrice";
import { EventTiming } from "./EventTiming";
import { Organization } from "./Organization";

@ObjectType()
@Entity({ name: 'bookingitems' })
export class BookingItem extends BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Field(type => Int)
    @Column({ type: 'int' })
    qty: number;

    @Field(type => String)
    @Column({ type: 'varchar', length: 255, default: 'active' })
    status: string;

    @Field(type => Booking)
    @OneToOne(() => Booking, booking => booking.bookingItem, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    booking: Booking;

    @Field(type => EventPrice)
    @ManyToOne(() => EventPrice, eventPrice => eventPrice.bookingItems, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    price: EventPrice;

    @Field(type => Organization)
    @ManyToOne(() => Organization, organization => organization.bookingItems, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'orgId' })
    organization: Organization;

    @Field(type => EventTiming)
    @ManyToOne(() => EventTiming, eventTiming => eventTiming.bookingItems, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    timing: EventTiming;
}