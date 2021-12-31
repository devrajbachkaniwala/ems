import { CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BookingItem } from "./BookingItem";
import { Event } from "./Event";
import { User } from "./User";

@Entity({ name: 'bookings' })
export class Booking {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    modifiedAt: Date;

    @ManyToOne(() => User, user => user.bookings, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Event, event => event.bookings, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    event: Event;

    @OneToOne(() => BookingItem, bookingItem => bookingItem.booking)
    bookingItem: BookingItem;
}