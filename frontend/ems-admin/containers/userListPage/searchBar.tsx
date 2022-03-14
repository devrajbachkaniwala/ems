import { ChangeEvent, FC } from 'react';
import { FaSearch } from 'react-icons/fa';

type TSearchBarProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const SearchBar: FC<TSearchBarProps> = ({ searchValue, setSearchValue }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <section className='w-full md:w-[400px] flex justify-center items-center my-2 px-2 py-1 border-2 border-dark-blue text-dark-blue rounded-md overflow-hidden '>
      <h2 className='mr-2'>
        <FaSearch className='text-dark-blue' />
      </h2>
      <input
        type='text'
        placeholder='Search user'
        value={searchValue}
        onChange={handleInputChange}
        className='w-full text-lg focus:outline-none'
      />
    </section>
  );
};

export { SearchBar };
