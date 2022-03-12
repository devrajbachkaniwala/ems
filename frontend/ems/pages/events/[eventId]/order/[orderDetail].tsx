import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage
} from 'next';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import { FC, ReactNode } from 'react';
import { MdCheckCircle, MdCancel } from 'react-icons/md';

const Order: NextPage = () => {
  const router = useRouter();

  const { orderDetail } = router.query;
  console.log(orderDetail);
  let orderConfirmationView: ReactNode;

  if (orderDetail === 'success') {
    orderConfirmationView = (
      <>
        <MdCheckCircle className='text-green-600 text-2xl' />
        <h2 className='text-slate-900 ml-1'>Success</h2>
      </>
    );
  } else if (orderDetail === 'failed') {
    orderConfirmationView = (
      <>
        <MdCancel className='text-red-600 text-2xl' />
        <h2 className='text-slate-900 ml-1'>Failed</h2>
      </>
    );
  } else {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
  }

  return (
    <div>
      <div className='w-4/5 h-[80vh] mx-auto'>
        <section className='flex flex-col justify-center items-center text-xl text-slate-700 py-2 border-2'>
          <div className='flex justify-center items-center'>
            {orderConfirmationView}
          </div>
          <div className='mt-2'>
            <p>Order id: 12345677890</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Order;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {}
  };
};

/* export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ value: string }>> {
  return {
    props: {
      value : ''
    }
  };
} */
