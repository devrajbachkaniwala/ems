import Link from 'next/link';

const EventDetail = () => {
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
              <Link href='/events/123/order'>
                <a className='inline-block w-[90%] rounded-md mx-2 px-4 text-center py-1 bg-green-700 text-white hover:bg-green-600 transition duration-200 ease-linear'>
                  Register
                </a>
              </Link>
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
                <button className='inline-block px-2 py-1 rounded-md border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition duration-200 ease-linear'>
                  Contact
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetail;
