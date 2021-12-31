import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BookingItem } from "./BookingItem";
import { Event } from "./Event";
import { OrganizationTeamMember } from "./OrganizationTeamMember";

@Entity({ name: 'organizations' })
export class Organization {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'int' })
    contactNo: number;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'bytea'})
    photo: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    modifiedAt: Date;

    @OneToMany(() => OrganizationTeamMember, organizationTeamMember => organizationTeamMember.organization)
    organizationTeamMembers: OrganizationTeamMember[];
    
    @OneToMany(() => Event, event => event.organization)
    events: Event[];

    @OneToMany(() => BookingItem, bookingItem => bookingItem.organization)
    bookingItems: BookingItem[];
}