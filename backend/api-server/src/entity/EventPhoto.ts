import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Event } from "./Event";

@Entity({ name: 'eventphotos' })
export class EventPhoto {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'bytea' })
    photo: string;
    
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    modifiedAt: Date;

    @ManyToOne(() => Event, event => event.photos, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    event: Event;
}