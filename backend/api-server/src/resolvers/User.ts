import { Arg, Authorized, Ctx, FieldResolver, ID, Mutation, Query, Resolver, Root } from "type-graphql";
import { User } from "../entity/User";
import { config } from "dotenv";
import { UpdateUserInput } from "../inputs/UserInput/UpdateUserInput";
import { Organization } from "../entity/Organization";
import { OrganizationTeamMember } from "../entity/OrganizationTeamMember";
import { IContext } from "../interface/IContext";
import { DeleteResult, ILike } from "typeorm";
import { ApolloError } from "apollo-server-express";
import { Review } from "../entity/Review";
import { Booking } from "../entity/Booking";
import { AddUserInput } from "../inputs/UserInput/AddUserInput";
import axios, { AxiosResponse } from "axios";
import { IUser } from "../interface/IUser";

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
            return await User.find({ fullName: ILike(`%${name}%`) });
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
                throw new ApolloError('User not found');
            }
            
            return true;
        } catch(err: any) {
            if(err instanceof ApolloError) {
                throw err;
            }
            console.log(err);
        }
    }

    // Create new user
    @Mutation(type => User)
    @Authorized('ADMIN')
    async createUser(
        @Arg('data', type => AddUserInput) data: AddUserInput
    ): Promise<IUser | undefined> {
        // When application running in docker container, it request from auth-server container
        const url: string = `http://auth-server:3000/register`;

        // When application running in local environment, it request from localhost
        //const url: string = `http://localhost:3000/register`;

        // POST request to auth server in order to register new user
        const res: AxiosResponse<IUser> = await axios.post<IUser, AxiosResponse<IUser>, AddUserInput>(url, data)
                                                .catch( (err: any) => {
                                                    throw new ApolloError(`${err.response.data.errorCode}: ${err.response.data.message}`);
                                                });
    
        res.data.createdAt = new Date(res.data.createdAt);
        res.data.modifiedAt = new Date(res.data.modifiedAt);
        return res.data;
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
    async updateUser(@Arg('data', type => UpdateUserInput) data: UpdateUserInput, @Ctx() { req }: IContext): Promise<User | undefined> {
        try {
            const user: User | undefined = await User.findOne({ where: { id: req.userId } });
            
            if(!user) {
                throw new ApolloError('User not found');
            }

            user.username = data.username || user.username;
            user.userPhoto = data.userPhoto || user.userPhoto;
            user.fullName = data.fullName || user.fullName;

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

    @FieldResolver(type => [Review], { nullable: true })
    async reviews(
        @Root() parent: User
    ): Promise<Review[] | undefined> {
        try {
            return await Review.find({ where: { user: { id: parent.id } }, relations: [ 'user', 'event' ] });
        } catch(err: any) {
            console.log(err);
        }
    }

    @FieldResolver(type => [Booking], { nullable: true })
    async bookings(
        @Root() parent: User
    ): Promise<Booking[] | undefined> {
        try {
            return await Booking.find({ where: { user: { id: parent.id } }, relations: [ 'user', 'event', 'bookingItem' ], order: { createdAt: 'DESC' } });
        } catch(err: any) {
            console.log(err);
        }
    }
}