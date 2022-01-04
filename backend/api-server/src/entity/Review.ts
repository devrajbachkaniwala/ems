import { Field, ID, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Event } from "./Event";
import { User } from "./User";

@ObjectType()
@Entity({ name: 'reviews' })
export class Review extends BaseEntity {

    @Field(type => ID)
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Field(type => String)
    @Column({ type: 'text' })
    description: string;

    @Field(type => Int)
    @Column({ type: 'int' })
    star: number;

    @Field(type => Date)
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Field(type => Date)
    @UpdateDateColumn({ type: 'timestamptz' })
    modifiedAt: Date;

    @Field(type => User)
    @ManyToOne(() => User, user => user.reviews, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    user: User;

    @Field(type => Event)
    @ManyToOne(() => Event, event => event.reviews, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    event: Event;
}