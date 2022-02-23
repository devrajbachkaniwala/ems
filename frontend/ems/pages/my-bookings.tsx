import EventLists, { events } from 'components/eventLists';

const MyBookings = () => {
  return (
    <div>
      <article className=' text-slate-700'>
        <h2 className='text-center text-xl font-bold'>My Bookings</h2>
        <section>
          <EventLists
            ev={events}
            cancelBooking={(id: number) => console.log(`cancel ${id}`)}
          />
        </section>
      </article>
    </div>
  );
};

export default MyBookings;
