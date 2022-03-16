import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Booking } from './Booking';
import { EventPhoto } from './EventPhoto';
import { EventPrice } from './EventPrice';
import { EventTiming } from './EventTiming';
import { Organization } from './Organization';
import { Review } from './Review';

@ObjectType()
@Entity({ name: 'events' })
export class Event extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field()
  @Column({ type: 'varchar', length: 85 })
  city: string;

  @Field()
  @Column({ type: 'varchar', length: 15 })
  state: string;

  @Field()
  @Column({ type: 'varchar', length: 56 })
  country: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  venue: string;

  @Field()
  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'point' })
  geoLatLng: string;

  @Field((type) => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field((type) => Date)
  @UpdateDateColumn({ type: 'timestamptz' })
  modifiedAt: Date;

  @ManyToOne(() => Organization, (organization) => organization.events, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'orgId' })
  organization: Organization;

  @OneToMany(() => EventPhoto, (photo) => photo.event)
  photos: EventPhoto[];

  @OneToMany(() => EventTiming, (timing) => timing.event)
  timings: EventTiming[];

  @OneToMany(() => EventPrice, (price) => price.event)
  prices: EventPrice[];

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings: Booking[];

  @OneToMany(() => Review, (review) => review.event)
  reviews: Review[];
}
