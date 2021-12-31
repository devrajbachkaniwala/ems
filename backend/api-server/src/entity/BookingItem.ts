import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking";
import { EventPrice } from "./EventPrice";
import { Organization } from "./Organization";

@Entity({ name: 'bookingitems' })
export class BookingItem {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'int' })
    qty: number;

    @OneToOne(() => Booking, booking => booking.bookingItem, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    booking: Booking;

    @ManyToOne(() => EventPrice, eventPrice => eventPrice.bookingItems, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    price: EventPrice;

    @ManyToOne(() => Organization, organization => organization.bookingItems, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'orgId' })
    organization: Organization;
}