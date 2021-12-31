import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Booking } from './Booking';
import { OrganizationTeamMember } from './OrganizationTeamMember';
import { Review } from './Review';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 150 })
    username: string;
    
    @Column({ type: 'bytea', nullable: true })
    userPhoto: string;

    @Column({ type: 'varchar', length: 255 })
    fullName: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'varchar', length: 10, default: 'user' })
    role: 'user' | 'admin' | 'organization';

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    modifiedAt: Date;

    @OneToOne(() => OrganizationTeamMember, organizationTeamMember => organizationTeamMember.user)
    organizationTeamMember: OrganizationTeamMember;

    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[];

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];
}