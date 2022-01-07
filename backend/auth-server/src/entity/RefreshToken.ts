import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'refreshtokens' })
export class RefreshToken extends BaseEntity {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    refreshToken: string;
}