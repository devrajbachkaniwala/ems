import authService from '@/services/authService';
import { apolloClient } from 'app/graphql';
import { store } from 'app/stores';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, MouseEventHandler, useLayoutEffect } from 'react';

const Header: FC = () => {
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
            <a>Event Management System Admin</a>
          </Link>
        </h2>
        <ul>
          <li>
            {store.auth.user ? (
              <button
                className='text-lg font-medium border-2 rounded-md border-dark-blue px-2 hover:text-white hover:bg-dark-blue transition-all duration-200 ease-out'
                type='button'
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              ''
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
const HeaderView = observer(Header);

export { HeaderView as Header };
