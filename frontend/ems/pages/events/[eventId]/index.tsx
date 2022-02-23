import Modal from 'components/modal';
import OrganizationContactPopUp from 'components/organizationContactPopUp';
import Link from 'next/link';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';

const EventDetail = () => {
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [showOrganizationPopUp, setShowOrganizationPopUp] =
    useState<boolean>(false);

  return (
    <>
      {/* Main container */}
      <div className='shadow-lg text-slate-700 h-fit w-3/4 mx-auto rounded-lg overflow-hidden'>
        {/* column container */}
        <div className='flex flex-col w-full'>
          {/* 1st row container */}
          <div className='flex flex-row flex-wrap'>
            {/* Left side Img container */}
            <div className='w-4/6 h-3/4 object-cover overflow-hidden'>
              <img src='/images/event-pic-1.jpg' alt='test-image' />
            </div>
            {/* Right side Event name container */}
            <div className='w-2/6 bg-gray-100'>
              <section className='p-5 ml-2 h-full text-slate-700 relative'>
                <div className='inline-block leading-4 text-center'>
                  <p className='font-bold uppercase'>Feb</p>
                  <p className='font-medium'>21</p>
                </div>

                <div className='mt-5'>
                  <h2 className='text-xl font-bold text-slate-800'>
                    Food event
                  </h2>
                  <p className='mt-4 text-slate-600 font-medium'>
                    By eventmanagement
                  </p>
                </div>

                <div className='absolute bottom-5 text-slate-800'>Free</div>
              </section>
            </div>
          </div>

          {/* 2nd row  Register button container */}
          <div className='w-full text-right border-b-2 py-3'>
            <div className='inline-block w-2/6 text-center'>
              {/* <Link href='/events/123/order'>
                <a className='inline-block w-[90%] rounded-md mx-2 px-4 text-center py-1 bg-green-700 text-white hover:bg-green-600 transition duration-200 ease-linear'>
                  Register
                </a>
              </Link> */}
              <button
                className='inline-block w-[90%] rounded-md mx-2 px-4 text-center py-1 bg-green-700 text-white hover:bg-green-600 transition duration-200 ease-linear'
                onClick={() => setShowRegisterModal(true)}
              >
                Register
              </button>
            </div>
          </div>

          {/* 3rd row container */}
          <div className='h-fit flex flex-row flex-wrap mt-9'>
            {/* Left side Description container */}
            <div className='w-4/6'>
              <section className='mx-4 pt-5 px-8'>
                <h2 className='text-slate-900 font-semibold mb-2'>
                  Description
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Optio veniam distinctio obcaecati minima. Aspernatur aperiam
                  molestias repellendus? Ut animi sunt veniam, tempora harum
                  iste officiis perferendis quis, dignissimos mollitia placeat.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cupiditate fugit voluptate quis? Voluptatibus aut accusamus
                  dolor quas nam, pariatur, in ab aliquam et a rerum ad sit, non
                  minima fuga.
                </p>
              </section>
            </div>
            {/* Right side Date & time and location container */}
            <div className='w-2/6'>
              <div className='mx-2 pt-5 px-5 pb-5'>
                <section>
                  <h2 className='text-slate-900 font-semibold mb-2'>
                    Date and Time
                  </h2>
                  <div className='leading-5 text-slate-900'>
                    <p>Fri, March 11, 2022</p>
                    <p>8:00 PM – 9:00 PM IST</p>
                  </div>
                </section>
                <div className='my-10'>
                  <select
                    name='selectDate'
                    className='border-2 border-slate-300 bg-slate-50 py-3 px-2 w-full hover:cursor-pointer focus:border-blue-600 text-slate-900'
                  >
                    <option value=''>Select a different date</option>
                    <option value=''>Fri Mar 11 (8:00 PM)</option>
                    <option value=''>Sun Feb 27 (9:00 PM)</option>
                    <option value=''>Sun Mar 06 (7:00 PM)</option>
                  </select>
                </div>

                <div className='my-10'>
                  <select
                    name='selectPrice'
                    className='border-2 border-slate-300 bg-slate-50 py-3 px-2 w-full hover:cursor-pointer focus:border-blue-600 text-slate-900'
                  >
                    <option value=''>Select a different price plan</option>
                    <option value=''>199 INR</option>
                    <option value=''>299 INR</option>
                    <option value=''>399 INR</option>
                  </select>
                </div>

                <section className='text-slate-900'>
                  <h2 className='font-semibold'>Location</h2>
                  <div className='leading-5 mt-2'>
                    <p>Event Host</p>
                    <p>Surat</p>
                    <p>Surat, Gujarat</p>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* 4th row Tags container */}
          <div className='w-full px-12 py-5 border-b-2'>
            <h2 className='text-slate-900 font-semibold mb-2'>Tags</h2>
            <p className='inline-block px-2 border-2 border-slate-400 rounded-2xl'>
              Food
            </p>
          </div>

          {/* 5th row Event Host container */}
          <div className='w-full my-12 flex justify-center items-start'>
            <section>
              <figure className='flex justify-center items-start'>
                <img
                  src='/images/event-pic-1.jpg'
                  alt=''
                  className='w-[120px] h-[120px] rounded-full object-cover'
                />
              </figure>
              <h2 className='mt-2 text-slate-900 text-center'>
                Organization Name
              </h2>
              <div className='text-center mt-1'>
                <button
                  className='inline-block px-2 py-1 rounded-md border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition duration-200 ease-linear'
                  onClick={() => setShowOrganizationPopUp(true)}
                >
                  Contact
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {showRegisterModal && (
        <Modal>
          {/* Modal container */}
          <div className='fixed bg-black bg-opacity-70 z-[1000] top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center'>
            <div className='grid md:grid-cols-[70%_30%] overflow-auto md:overflow-hidden lg:w-4/5 xl:w-3/5 h-4/5 mx-10 bg-slate-50 rounded-lg  text-slate-700 relative'>
              {/* Left side modal container */}
              <div className=''>
                <section className=' px-4 py-2 text-center border-b-2'>
                  <h2 className='text-xl font-bold'>Event Name</h2>
                  <p className='text-sm font-semibold'>
                    Sun, Mar 13, 2022 2:00Pm - 3:00PM IST
                  </p>
                </section>

                <section className='my-10 mx-7'>
                  <h3 className='mb-1'>Select a different price plan</h3>
                  <select
                    name='selectPrice'
                    className='border-2 border-slate-300 bg-slate-50 p-1 w-52 hover:cursor-pointer focus:border-blue-600 text-slate-900'
                  >
                    <option value=''>199 INR</option>
                    <option value=''>299 INR</option>
                    <option value=''>399 INR</option>
                  </select>
                </section>

                <section className='my-10 mx-7'>
                  <h3 className='mb-1'>Select quantity</h3>
                  <select
                    name='selectQty'
                    className='border-2 border-slate-300 bg-slate-50 p-1 w-52 hover:cursor-pointer focus:border-blue-600 text-slate-900'
                  >
                    {'1,2,3,4,5,6,7,8,9,10'.split(',').map((item) => {
                      return (
                        <option key={item} value={+item}>
                          {+item}
                        </option>
                      );
                    })}
                  </select>
                </section>
              </div>

              {/* Right side modal container */}
              <div className='bg-slate-100'>
                <section>
                  <img
                    src='/images/event-pic-2.jpg'
                    alt=''
                    className='w-full h-auto object-cover'
                  />
                </section>
                <section className='my-5 mx-5'>
                  <h3 className='text-slate-900 mb-2'>Order summary</h3>
                  <div className='border-b-2 pb-2 mb-2'>
                    <div className='flex'>
                      <p className='flex-grow'>1 x plan</p>
                      <p>199.00</p>
                    </div>
                  </div>
                  <div className='flex'>
                    <p className='flex-grow'>Total</p>
                    <p>INR 199.00</p>
                  </div>
                </section>
                <div className='flex flex-col justify-center items-center'>
                  <button className='my-2 px-2 py-1 rounded-md bg-green-500 hover:bg-green-700 hover:text-slate-50'>
                    Register
                  </button>
                </div>
              </div>
              <MdClose
                onClick={() => setShowRegisterModal(false)}
                className='absolute text-lg text-slate-700 top-0 right-0 hover:cursor-pointer'
              />
            </div>
          </div>
        </Modal>
      )}

      {showOrganizationPopUp && (
        <OrganizationContactPopUp
          closeOrganizationContactPopUp={() => setShowOrganizationPopUp(false)}
        />
      )}
    </>
  );
};

export default EventDetail;
