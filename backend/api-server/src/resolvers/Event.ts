import { Query, Resolver } from "type-graphql";

@Resolver()
export class EventResolver {
    @Query(() => String)
    async events() {
        return "hello world";
    }
}