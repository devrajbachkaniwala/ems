import eventService from '@/services/eventService';
import { EventList } from '@/services/eventService/__generated__/EventList';
import EventLists from 'components/eventsPage/eventLists';
import Footer from 'components/footer';
import Header from 'components/header';
import { ProtectedRoute } from 'components/protectedRoute';
import { GetServerSideProps, NextPage } from 'next';
import { FaSearch } from 'react-icons/fa';
import { TPageLayout } from 'types/pageLayout';

type TEventsProps = {
  events: EventList['events'];
};

const Events: NextPage<TEventsProps> & TPageLayout = ({ events }) => {
  return (
    <div className='min-h-[80vh] overflow-auto'>
      {/* Event Search Bar */}
      <div className='w-4/5 mx-auto border-2 border-slate-400 max-w-[720px] my-3 flex flex-row items-center rounded'>
        <FaSearch className='text-slate-400 text-lg mx-1' />
        <input
          type='text'
          placeholder='search'
          className='w-full px-2 py-2 text-lg text-slate-700 focus:outline-none'
        />
      </div>
      {/* Event lists */}
      {events?.length && <EventLists events={events} />}
    </div>
  );
};

export default Events;

Events.getLayout = (page: any) => {
  return (
    <>
      <ProtectedRoute role='public'>
        <Header />
        {page}
        <Footer />
      </ProtectedRoute>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  events: EventList['events'];
}> = async (ctx) => {
  try {
    const events = await eventService.getAllEvents();
    return {
      props: {
        events
      }
    };
  } catch (err: any) {
    console.log(err);
    return {
      props: {
        events: null
      }
    };
  }
};
