import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Event } from "./Event";

@ObjectType()
@Entity({ name: 'eventphotos' })
export class EventPhoto extends BaseEntity {

    @Field(type => ID)
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'bytea' })
    photo: string;
    
    @Field(type => Date)
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Field(type => Date)
    @UpdateDateColumn({ type: 'timestamptz' })
    modifiedAt: Date;

    @Field(type => Event)
    @ManyToOne(() => Event, event => event.photos, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    event: Event;
}