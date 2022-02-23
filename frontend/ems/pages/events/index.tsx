import EventLists from 'components/eventLists';
import { FaSearch } from 'react-icons/fa';

const Events = () => {
  return (
    <div>
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
      <EventLists />
    </div>
  );
};

export default Events;
