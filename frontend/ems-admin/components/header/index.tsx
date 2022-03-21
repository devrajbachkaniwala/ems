import authService from '@/services/authService';
import { apolloClient } from 'app/graphql';
import { store } from 'app/stores';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, MouseEventHandler, useLayoutEffect, useState } from 'react';

const Header: FC = () => {
  const [showUserDropDown, setShowUserDropdown] = useState<boolean>(false);

  const router = useRouter();

  const handleLogout: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const refreshToken = localStorage.getItem('refreshToken') ?? '';
    const res = await authService.logout(refreshToken);

    if (res) {
      store.auth.setUser(undefined);
      localStorage.clear();
      sessionStorage.clear();
      apolloClient.resetStore();
      router.replace('/login');
      return;
    }
  };

  return (
    <header className='h-[10vh] bg-baby-blue text-dark-blue flex justify-center items-center'>
      <nav className='flex justify-center items-center px-2 sm:px-10 sm:py-1 flex-grow'>
        <h2 className='font-bold text-xl flex-grow'>
          <Link href={'/'}>
            <a className='hover:text-midnight-blue transition-all duration-200 ease-out'>
              Event Management System Admin
            </a>
          </Link>
        </h2>
        <ul>
          {store.auth.user ? (
            <div className='flex justify-center items-center'>
              <li
                className='relative mr-4 min-w-[100px] w-fit hover:cursor-pointer'
                onMouseEnter={() => setShowUserDropdown(true)}
                onMouseLeave={() => setShowUserDropdown(false)}
              >
                <div
                  className={`w-full flex justify-evenly items-center hover:text-midnight-blue hover:cursor-pointer transition-all duration-200 ease-out ${
                    showUserDropDown ? 'text-midnight-blue' : ''
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
                    className={`absolute left-0 right-0 top-4 bg-slate-100 rounded-md overflow-hidden transition-all duration-200 ease-out ${
                      showUserDropDown ? 'block' : 'hidden'
                    }`}
                  >
                    <li className='hover:bg-slate-200 hover:text-midnight-blue hover:cursor-pointer transition-all duration-200 ease-out'>
                      <Link href={'/edit-profile'}>
                        <a className='inline-block h-full w-full px-2 py-1 leading-5'>
                          Edit Profile
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <button
                  className='text-lg font-medium border-2 rounded-md border-dark-blue px-2 hover:text-white hover:bg-dark-blue transition-all duration-200 ease-out'
                  type='button'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </div>
          ) : (
            ''
          )}
        </ul>
      </nav>
    </header>
  );
};
const HeaderView = observer(Header);

export { HeaderView as Header };
