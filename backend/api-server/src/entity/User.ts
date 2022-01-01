import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Booking } from './Booking';
import { OrganizationTeamMember } from './OrganizationTeamMember';
import { Review } from './Review';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Field(() => String)
    @Column({ type: 'varchar', length: 150 })
    username: string;
    
    @Field(() => String, { nullable: true })
    @Column({ type: 'bytea', nullable: true })
    userPhoto: string;

    @Field(() => String)
    @Column({ type: 'varchar', length: 255 })
    fullName: string;

    @Field(() => String)
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Field(() => String)
    @Column({ type: 'varchar', length: 10, default: 'user' })
    role: 'user' | 'admin' | 'organization';

    @Field(() => Boolean)
    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Field(() => Date)
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn({ type: 'timestamptz' })
    modifiedAt: Date;

    @OneToOne(() => OrganizationTeamMember, organizationTeamMember => organizationTeamMember.user)
    organizationTeamMember: OrganizationTeamMember;

    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[];

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];
}