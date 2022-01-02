import { Arg, Authorized, Ctx, FieldResolver, ID, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { User } from "../entity/User";
import { verifyToken } from "../middleware/verifyToken";
import { config } from "dotenv";
import { UserInput } from "../inputs/UserInput";
import { Organization } from "../entity/Organization";
import { OrganizationTeamMember } from "../entity/OrganizationTeamMember";
import { IContext } from "../interface/IContext";

config();

@Resolver(of => User)
export class UserResolver { 

    @Query(type => [User])
    @Authorized('ADMIN')
    async users(): Promise<User[] | undefined> {
        try {
            return await User.find();       
        } catch(err: any) {
            console.log(err);
        }
    }

    @Query(type => User)
    @Authorized('USER')
    async user(@Ctx() { req }: IContext): Promise<User | undefined> {
        try {
            return await User.findOne(req.userId);
        } catch(err: any) {
            console.log(err);
        }
    }

    @Mutation(type => User)
    @Authorized('USER')
    async updateUser(@Arg('data', type => UserInput) data: UserInput, @Ctx() { req }: IContext): Promise<User | undefined> {
        try {
            const userId: number = req.userId;
            const user: User | undefined = await User.findOne(userId);
            
            if(!user) {
                return;
            }

            user.username = data.username || user.username;
            user.userPhoto = data.userPhoto || user.userPhoto;
            user.fullName = data.fullName || user.fullName;
            user.role = data.role || user.role;

            await user.save();

            return user;
        } catch(err: any) {
            console.log(err);
        }
    }
    
    @Mutation(type => User)
    @Authorized('ADMIN')
    async moderateUser(@Arg('id', type => ID) userId: number, @Arg('isActive', type => Boolean) isActive: boolean): Promise<User | undefined> {
        try {
            const user: User | undefined = await User.findOne(userId);
            if(!user) {
                return;
            }
            user.isActive = isActive;
            return await user.save();
        } catch(err: any) {
            console.log(err);
        }
    }

    @FieldResolver(type => String, { nullable: true })
    userPhoto(@Root() parent: User): string {
        return parent.userPhoto && parent.userPhoto.toString();
    }

    @FieldResolver(type => Organization, { nullable: true })
    async organization(@Root() parent: User): Promise<Organization | undefined> {
        const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: parent.id } }, relations: [ 'user', 'organization' ] });
        return orgTeamMember?.organization;
    }

   /*  @Query(() => OrganizationTeamMember)
    async organization( @Ctx() { req }: { req: any }) {
        return await OrganizationTeamMember.find({ where: { user: { id: req.userId } }, relations: [ "user", "organization" ] })
    } */

}