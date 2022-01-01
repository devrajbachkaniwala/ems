import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { User } from "../entity/User";
import { verifyToken } from "../middleware/verifyToken";
import { config } from "dotenv";
import { UserInput } from "../inputs/UserInput";
import { Organization } from "../entity/Organization";
import { OrganizationTeamMember } from "../entity/OrganizationTeamMember";

config();

@Resolver()
export class UserResolver {
    @Query(() => [User])
    @Authorized('ADMIN')
    async users(): Promise<User[] | undefined> {
        return await User.find();       
    }

    @Query(() => User)
    @Authorized('USER')
    async user(@Ctx() { req }: { req: any }): Promise<User | undefined> {
        return await User.findOne(req.userId);
    }

    @Mutation(() => User)
    @Authorized('USER')
    async updateUser(@Arg('data') data: UserInput, @Ctx() { req }: { req: any }): Promise<User> {
        const user: User = await User.findOne(req.userId);
        user.username = data.username || user.username;
        user.userPhoto = data.userPhoto || user.userPhoto;
        user.fullName = data.fullName || user.fullName;
        
        return await user.save();
    }
    
    @Mutation(() => User)
    @Authorized('ADMIN')
    async moderateUser(@Arg('id') userId: number, @Arg('isActive') isActive: boolean): Promise<User | undefined> {
        const user: User | undefined = await User.findOne(userId);
        if(!user) {
            return;
        }
        user.isActive = isActive;
        return await user.save();
    }

    @Query(() => OrganizationTeamMember)
    async organization( @Ctx() { req }: { req: any }) {
        return await OrganizationTeamMember.find({ where: { user: { id: req.userId } }, relations: [ "user", "organization" ] })
    }

}