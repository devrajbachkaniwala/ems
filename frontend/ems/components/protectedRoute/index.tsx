import authService from '@/services/authService';
import { store } from 'app/stores';
import LoadingSpinner from 'components/loadingSpinner';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useState } from 'react';

type TProtectedRoute = {
  role?: 'user' | 'organization' | 'public';
  children: ReactNode;
};

const ProtectedRoute: FC<TProtectedRoute> = ({ children, role = 'user' }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    if (role === 'public') {
      if (store.auth.user?.id) {
        setIsLoading(false);
        return;
      }

      authService
        .getUserProfile()
        .then((userDetail) => {
          if (userDetail.id) {
            store.auth.setUser(userDetail);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [role]);

  useEffect(() => {
    if (role === 'user') {
      if (store.auth.user?.id) {
        setIsLoading(false);
        return;
      }

      authService
        .getUserProfile()
        .then((userDetail) => {
          if (!userDetail.id) {
            router.replace('/login');
            return;
          }
          store.auth.setUser(userDetail);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          router.replace('/login');
        });
    }
  }, [role, router]);

  useEffect(() => {
    if (role === 'organization') {
      if (store.auth.user?.id) {
        if (store.auth.user?.organization?.id) {
          setIsLoading(false);
          return;
        } else {
          if (router.pathname === '/organization/add') {
            setIsLoading(false);
            return;
          }
          router.replace('/organization/add');
          return;
        }
      }

      authService
        .getUserProfile()
        .then((userDetail) => {
          if (!userDetail.id) {
            router.replace('/login');
            return;
          }
          if (!userDetail.organization?.id) {
            console.log('userdetail', userDetail.organization?.id);
            console.log(router.pathname);
            if (router.pathname === '/organization/add') {
              setIsLoading(false);
              return;
            }
            router.replace('/organization/add');
            return;
          }
          store.auth.setUser(userDetail);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          router.replace('/login');
        });
    }
  }, [role, router]);

  if (!store.auth.user && isLoading) {
    return (
      <div className='min-h-[100vh] overflow-auto flex justify-center'>
        <LoadingSpinner />
      </div>
    );
  }
  return <>{children}</>;
};

const ProtectedRouteView = observer(ProtectedRoute);

export { ProtectedRouteView as ProtectedRoute };
