import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from "./Organization";
import { User } from "./User";

@ObjectType()
@Entity({ name: 'organizationteammembers' })
export class OrganizationTeamMember extends BaseEntity {

    @Field(type => ID)
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
    
    //@Field(type => Organization)
    @ManyToOne(() => Organization, organization => organization.organizationTeamMembers, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orgId' })
    organization: Organization;

    @Field(type => User, { nullable: true })
    @OneToOne(() => User, user => user.organizationTeamMember, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;
}