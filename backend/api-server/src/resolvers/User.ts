import { Arg, Authorized, Ctx, FieldResolver, ID, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { User } from "../entity/User";
import { config } from "dotenv";
import { UserInput } from "../inputs/UserInput";
import { Organization } from "../entity/Organization";
import { OrganizationTeamMember } from "../entity/OrganizationTeamMember";
import { IContext } from "../interface/IContext";
import { DeleteResult, Like } from "typeorm";
import { ApolloError } from "apollo-server-express";

config();

@Resolver(of => User)
export class UserResolver { 

    /*
     *
     * ADMIN ROLE 
     *
    */

    // QUERY All Users
    @Query(type => [User])
    @Authorized('ADMIN')
    async users(): Promise<User[] | undefined> {
        try {
            return await User.find({ order: { createdAt: 'DESC' } });       
        } catch(err: any) {
            console.log(err);
        }
    }

    // QUERY by user's name
    @Query(type => [User], { nullable: true })
    @Authorized('ADMIN')
    async searchUserByName(@Arg('name', type => String) name: string): Promise<User[] | undefined> {
        try {
            return await User.find({ fullName: Like(`%${name}%`) });
        } catch(err: any) {
            console.log(err);
        }
    }

    // Moderate user
    @Mutation(type => User)
    @Authorized('ADMIN')
    async moderateUser(@Arg('id', type => ID) userId: number, @Arg('isActive', type => Boolean) isActive: boolean): Promise<User | undefined> {
        try {
            const user: User | undefined = await User.findOne(userId);
            if(!user) {
                throw new ApolloError('User not found');
            }
            user.isActive = isActive;
            return await user.save();
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }

    // Delete user by userId
    @Mutation(type => Boolean)
    @Authorized('ADMIN')
    async deleteUserById(@Arg('id', type => ID) userId: number): Promise<Boolean | undefined> {
        try {
            const user: DeleteResult | undefined = await User.delete(userId);
            if(!user.affected) {
                throw new ApolloError('User already deleted');
            }
            
            return true;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }

    /*
     *
     * USER ROLE 
     *
    */

    // Query user by userId after verifying token
    @Query(type => User)
    @Authorized('USER')
    async user(@Ctx() { req }: IContext): Promise<User | undefined> {
        try {
            return await User.findOne(req.userId);
        } catch(err: any) {
            console.log(err);
        }
    }

    // Update user data
    @Mutation(type => User)
    @Authorized('USER')
    async updateUser(@Arg('data', type => UserInput) data: UserInput, @Ctx() { req }: IContext): Promise<User | undefined> {
        try {
            const userId: number = req.userId;
            const user: User | undefined = await User.findOne(userId);
            
            if(!user) {
                throw new ApolloError('User not found');
            }

            user.username = data.username || user.username;
            user.userPhoto = data.userPhoto || user.userPhoto;
            user.fullName = data.fullName || user.fullName;
            user.role = data.role || user.role;

            await user.save();

            return user;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }
    
    /*
     *
     * Field Resolvers
     *
    */

    @FieldResolver(type => String, { nullable: true })
    userPhoto(@Root() parent: User): string {
        return parent.userPhoto && parent.userPhoto.toString();
    }

    @FieldResolver(type => Organization, { nullable: true })
    async organization(@Root() parent: User): Promise<Organization | undefined> {
        const orgTeamMember: OrganizationTeamMember | undefined = await OrganizationTeamMember.findOne({ where: { user: { id: parent.id } }, relations: [ 'user', 'organization' ] });
        return orgTeamMember?.organization;
    }

}