import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Booking } from "./Booking";
import { EventPhoto } from "./EventPhoto";
import { EventPrice } from "./EventPrice";
import { EventTiming } from "./EventTiming";
import { Organization } from "./Organization";
import { Review } from "./Review";

@Entity({ name: 'events' })
export class Event {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text'})
    description: string;

    @Column({ type: 'varchar', length: 200 })
    city: string;

    @Column({ type: 'varchar', length: 200 })
    state: string;

    @Column({ type: 'varchar', length: 200 })
    country: string;

    @Column({ type: 'varchar', length: 255 })
    venue: string;

    @Column({ type: 'varchar', length: 255 })
    category: string;

    @Column({ type: 'point' })
    geoLatLng: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    modifiedAt: Date;

    @ManyToOne(() => Organization, organization => organization.events, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orgId' })
    organization: Organization;

    @OneToMany(() => EventPhoto, photo => photo.event)
    photos: EventPhoto[];

    @OneToMany(() => EventTiming, timing => timing.event)
    timings: EventTiming[];

    @OneToMany(() => EventPrice, price => price.event)
    prices: EventPrice[];

    @OneToMany(() => Booking, booking => booking.event)
    bookings: Booking[];

    @OneToMany(() => Review, review => review.event)
    reviews: Review[];
}