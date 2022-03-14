import { Footer } from 'components/footer';
import { Header } from 'components/header';
import LoadingSpinner from 'components/loadingSpinner';
import { NextPage } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';

const PageNotFound: NextPage & { getLayout: (page: any) => ReactNode } = () => {
  return (
    <div className='min-h-[80vh] overflow-auto text-slate-700'>
      <h2 className='text-2xl font-bold text-center my-2'>Page Not Found</h2>
      <div className='text-center'>
        <Link href='/'>
          <a className='text-xl text-blue font-medium'>Go Home</a>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;

PageNotFound.getLayout = (page: any) => {
  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
};
