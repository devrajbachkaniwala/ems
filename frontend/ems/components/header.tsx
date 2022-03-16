import { useAppSelector } from 'app/hooks';
import { store } from 'app/stores';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Header: React.FC = () => {
  const [showUserDropDown, setShowUserDropDown] = useState<boolean>(false);
  const [showOrgDropDown, setShowOrgDropDown] = useState<boolean>(false);

  const router = useRouter();

  const loginRegisterLink =
    router.pathname === '/login' ? '/register' : '/login';

  const loginRegisterText = router.pathname === '/login' ? 'Register' : 'Login';

  return (
    <header className='h-[10vh] px-6 text-slate-500'>
      <nav className='h-full flex items-center'>
        <h2 className='flex-grow'>
          <Link href='/'>
            <a className='hover:text-slate-900 focus:outline-none text-xl font-bold transition-all duration-200 ease-out'>
              Event Management System
            </a>
          </Link>
        </h2>
        <ul className='h-full flex flex-row items-center text-slate-700'>
          {store.auth.user?.id ? (
            <li
              className='relative mr-4 w-[140px] text-center'
              onMouseEnter={() => setShowUserDropDown(true)}
              onMouseLeave={() => setShowUserDropDown(false)}
            >
              <div
                className={`w-full flex justify-between items-center hover:text-blue-600 hover:cursor-pointer ${
                  showUserDropDown ? 'text-blue-600' : ''
                }`}
              >
                <div className='h-[40px] w-[40px] bg-slate-200 rounded-full'>
                  {store.auth.user?.userPhoto ? (
                    <Image
                      src={store.auth.user.userPhoto}
                      alt={store.auth.user.username}
                      width={40}
                      height={40}
                      className='rounded-full object-cover'
                    />
                  ) : (
                    ''
                  )}
                </div>
                <div className='ml-1'>{store.auth.user?.username}</div>
              </div>
              <div className='absolute left-0 right-0 -bottom-2 h-4'>
                <ul
                  className={`absolute left-0 right-0 top-4 bg-slate-100 rounded-md overflow-hidden ${
                    showUserDropDown ? 'block' : 'hidden'
                  }`}
                >
                  <li className='hover:bg-slate-200 hover:text-blue-600 hover:cursor-pointer'>
                    <Link href={'/my-bookings'}>
                      <a className='inline-block h-full w-full px-2 py-1 leading-5'>
                        My Bookings
                      </a>
                    </Link>
                  </li>
                  <li className='hover:bg-slate-200 hover:text-blue-600 hover:cursor-pointer'>
                    <Link href={'/edit-profile'}>
                      <a className='inline-block h-full w-full px-2 py-1 leading-5'>
                        Edit Profile
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            ''
          )}

          {store.auth.user?.organization?.id ? (
            <li
              className='relative mr-4 w-fit text-center'
              onMouseEnter={() => setShowOrgDropDown(true)}
              onMouseLeave={() => setShowOrgDropDown(false)}
            >
              <div
                className={`hover:text-blue-600 cursor-pointer ${
                  showOrgDropDown ? 'text-blue-600' : ''
                }`}
              >
                Manage Organization
              </div>
              <div className='absolute left-0 right-0 -bottom-2 h-4'>
                <ul
                  className={`absolute left-0 right-0 top-4 bg-slate-100 rounded-md overflow-hidden ${
                    showOrgDropDown ? 'block' : 'hidden'
                  }`}
                >
                  <li className='p-2 hover:bg-slate-200 hover:text-blue-600'>
                    <Link
                      href={`/organization/${store.auth.user?.organization?.id}/edit`}
                    >
                      <a className='inline-block h-full w-full px-2 py-1 leading-5'>
                        Edit Organization
                      </a>
                    </Link>
                  </li>
                  <li className='p-2 hover:bg-slate-200 hover:text-blue-600'>
                    <Link
                      href={`/organization/${store.auth.user?.organization?.id}/team-members`}
                    >
                      <a className='inline-block h-full w-full px-2 py-1 leading-5'>
                        View Team Members
                      </a>
                    </Link>
                  </li>
                  <li className='p-2 hover:bg-slate-200 hover:text-blue-600'>
                    <Link
                      href={`/organization/${store.auth.user?.organization?.id}/my-events`}
                    >
                      <a className='inline-block h-full w-full px-2 py-1 leading-5'>
                        My Events
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            ''
          )}

          {store.auth.user?.id ? (
            <li className='mr-4 '>
              <Link href={'/events/add'}>
                <a className='inline-block h-full w-full hover:text-blue-600'>
                  Create an event
                </a>
              </Link>
            </li>
          ) : (
            ''
          )}

          <li className='text-lg'>
            {store.auth.user?.id ? (
              <button>
                <a className='inline-block px-3 py-1 bg-slate-200 rounded-md hover:bg-slate-300 hover:text-slate-900 focus:outline-none transition-all duration-200 ease-out'>
                  Logout
                </a>
              </button>
            ) : (
              <Link href={loginRegisterLink}>
                <a className='inline-block px-3 py-1 bg-slate-200 rounded-md hover:bg-slate-300 hover:text-slate-900 focus:outline-none transition-all duration-200 ease-out'>
                  {loginRegisterText}
                </a>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
