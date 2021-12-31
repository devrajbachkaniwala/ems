import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookingItem } from "./BookingItem";
import { Event } from "./Event";

@Entity({ name: 'eventprices' })
export class EventPrice {
    
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'int' })
    price: number;

    @Column({ type: 'varchar', length: 100 })
    currency: string;

    @Column({ type: 'int', default: 0 })
    maxLimit: number;

    @Column({ type: 'int', default: 0 })
    sold: number;

    @ManyToOne(() => Event, event => event.prices, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    event: Event;

    @OneToMany(() => BookingItem, bookingItem => bookingItem.price)
    bookingItems: BookingItem[];
}