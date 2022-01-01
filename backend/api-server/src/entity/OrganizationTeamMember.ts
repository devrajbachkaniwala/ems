import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from "./Organization";
import { User } from "./User";

@ObjectType()
@Entity({ name: 'organizationteammembers' })
export class OrganizationTeamMember extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
    
    //@Field(() => Organization)
    @ManyToOne(() => Organization, organization => organization.organizationTeamMembers, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orgId' })
    organization: Organization;

    @Field(() => User)
    @OneToOne(() => User, user => user.organizationTeamMember, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;
}