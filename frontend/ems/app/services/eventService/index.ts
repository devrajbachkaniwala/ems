import { apolloClient } from "../../graphql";
import { GET_ALL_EVENTS } from "./queries";
import { EventsPage } from "./__generated__/EventsPage";

class EventService {
    async getAllEvents() {
        const res = await apolloClient.query<EventsPage["events"]>({ query: GET_ALL_EVENTS });
        return res;
    }
}

export const test = 'hi';

export default new EventService();