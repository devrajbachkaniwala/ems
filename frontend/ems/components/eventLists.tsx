import { TEvent } from 'pages/events';
import { TMyBooking } from 'pages/my-bookings';
import { TMyEvent } from 'pages/organization/[orgId]/my-events';
import React, { FC } from 'react';
import EventListItem from './eventListItem';

type TEventListsProps = {
  bookings?: TMyBooking[];
  myEvents?: TMyEvent['events'];
  events?: TEvent;
};

const EventLists: FC<TEventListsProps> = (props) => {
  const bookings = props.bookings;
  const myEvents = props.myEvents;
  const events = props.events;

  let curEvents: any = [];

  if (bookings) {
    curEvents = bookings;
  } else if (myEvents) {
    curEvents = myEvents;
  } else if (events) {
    curEvents = events;
  }

  return (
    <div>
      EventLists
      <div>{JSON.stringify(props)}</div>
      <div>
        {curEvents.map((event: any) => (
          <EventListItem key={event.id} {...props} />
        ))}
      </div>
    </div>
  );
};

export default EventLists;
