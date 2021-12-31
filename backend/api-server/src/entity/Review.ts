import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Event } from "./Event";
import { User } from "./User";

@Entity({ name: 'reviews' })
export class Review {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'int' })
    star: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    modifiedAt: Date;

    @ManyToOne(() => User, user => user.reviews, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Event, event => event.reviews, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    event: Event;
}