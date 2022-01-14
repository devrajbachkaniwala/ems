import { Field, ID, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BookingItem } from "./BookingItem";
import { Event } from "./Event";
import { OrganizationTeamMember } from "./OrganizationTeamMember";

@ObjectType()
@Entity({ name: 'organizations' })
export class Organization extends BaseEntity {

    @Field(type => ID)
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Field(type => String)
    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Field(type => String)
    @Column({ type: 'text' })
    description: string;

    @Field(type => String)
    @Column({ type: 'varchar', length: 20 })
    contactNo: string;

    @Field(type => String)
    @Column({ type: 'varchar', length: 150 })
    email: string;

    @Column({ type: 'bytea'})
    photo: string;

    @Field(type => Date)
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Field(type => Date)
    @UpdateDateColumn({ type: 'timestamptz' })
    modifiedAt: Date;

    @OneToMany(() => OrganizationTeamMember, organizationTeamMember => organizationTeamMember.organization)
    organizationTeamMembers: OrganizationTeamMember[];
    
    @OneToMany(() => Event, event => event.organization)
    events: Event[];

    @OneToMany(() => BookingItem, bookingItem => bookingItem.organization)
    bookingItems: BookingItem[];
}