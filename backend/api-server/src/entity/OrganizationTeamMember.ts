import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from "./Organization";
import { User } from "./User";

@Entity({ name: 'organizationteammembers' })
export class OrganizationTeamMember {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
    
    @ManyToOne(() => Organization, organization => organization.organizationTeamMembers, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orgId' })
    organization: Organization;

    @OneToOne(() => User, user => user.organizationTeamMember, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;
}