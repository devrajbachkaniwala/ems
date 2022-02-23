import { FC } from 'react';
import { FaRegPlusSquare } from 'react-icons/fa';

const EditProfile: FC = () => {
  return (
    <div>
      <div className='w-4/5 mx-auto h-[80vh]'>
        <form className='max-w-[380px] flex flex-col justify-center items-center'>
          <div className='flex justify-center items-center mb-5'>
            <div className='h-[120px] w-[120px] rounded-full bg-slate-200 relative hover:cursor-pointer border-2 border-slate-400 hover:border-slate-700 text-slate-400 hover:text-slate-700'>
              {/* formValues.userPhoto && (
                <Image
                  src={`${formValues.userPhoto}`}
                  alt='userPhoto'
                  width={120}
                  height={120}
                  className='rounded-full w-36 object-cover'
                />
              ) */}
              <FaRegPlusSquare className='absolute text-2xl text-inherit right-5 bottom-3 z-10' />
            </div>
            <input
              type='file'
              name='userPhoto'
              /* onChange={handleUserPhoto} */
              className='hidden'
              /* ref={} */
            />
          </div>

          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              name='username'
              value={'test'}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='fullName'>Full Name</label>
            <input
              type='text'
              id='fullName'
              name='fullName'
              value={'test'}
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
