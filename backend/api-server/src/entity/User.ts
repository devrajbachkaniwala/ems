import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Booking } from './Booking';
import { OrganizationTeamMember } from './OrganizationTeamMember';
import { Review } from './Review';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Field(type => String)
    @Column({ type: 'varchar', length: 150 })
    username: string;
    
    //@Field(type => String, { nullable: true })
    @Column({ type: 'bytea', nullable: true })
    userPhoto: string;

    @Field(type => String)
    @Column({ type: 'varchar', length: 255 })
    fullName: string;

    @Field(type => String)
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Field(type => String)
    @Column({ type: 'varchar', length: 20, default: 'user' })
    role: 'user' | 'admin' | 'organization';

    @Field(type => Boolean)
    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Field(type => Date)
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Field(type => Date)
    @UpdateDateColumn({ type: 'timestamptz' })
    modifiedAt: Date;

    @OneToOne(() => OrganizationTeamMember, organizationTeamMember => organizationTeamMember.user)
    organizationTeamMember: OrganizationTeamMember;

    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[];

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];
}