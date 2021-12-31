import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event";

@Entity({ name: 'eventtimings' })
export class EventTiming {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'time' })
    startTime: string;

    @Column({ type: 'time' })
    endTime: string;

    @ManyToOne(() => Event, event => event.timings, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    event: Event;
}