import EventLists from 'components/eventLists';
import { myBookingsData } from 'pages/my-bookings';
import React from 'react';

const Bookings = () => {
  return (
    <div>
      Bookings Page
      <div>
        <EventLists bookings={myBookingsData} />
      </div>
    </div>
  );
};

export default Bookings;
