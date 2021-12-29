import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 150 })
    username: string;
    
    @Column({ type: 'bytea', nullable: true })
    userPhoto: string;

    @Column({ type: 'varchar', length: 255 })
    firstname: string;

    @Column({ type: 'varchar', length: 255 })
    lastname: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'varchar', length: 10, default: 'user' })
    role: 'user' | 'admin' | 'organization';

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}