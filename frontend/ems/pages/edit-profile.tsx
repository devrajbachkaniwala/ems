import authService from '@/services/authService';
import { store } from 'app/stores';
import Footer from 'components/footer';
import Header from 'components/header';
import { ProtectedRoute } from 'components/protectedRoute';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import { FaRegPlusSquare } from 'react-icons/fa';
import { TPageLayout } from 'types/pageLayout';
import { imageValidator } from 'utils/imageValidator';
import { UpdateUserInput } from '__generated__/globalTypes';
import { UserProfile } from '../app/services/authService/__generated__/UserProfile';

const EditProfile: NextPage & TPageLayout = () => {
  const [user, setUser] = useState<UserProfile['user'] | undefined>();
  //const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFieldDisabled, setIsFieldDisabled] = useState<boolean>(true);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const router = useRouter();
  const imgRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    /* authService
      .getUserProfile()
      .then((userDetail) => {
        setIsLoading(false);
        setUser(userDetail);
      })
      .catch((err) => {
        console.log(err);
        router.replace('/login');
      }); */
    setUser(store.auth.user);
  }, []);

  useEffect(() => {
    if (user?.userPhoto) {
      setProfilePic(user.userPhoto);
    }
  }, [user]);

  const setUserPhoto = (imgFile: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = () => {
      setProfilePic(reader.result as string);
    };
  };

  const handleUserPhoto = (e: ChangeEvent<HTMLInputElement>): void => {
    try {
      setProfilePic(null);
      if (!e.target.files?.length) {
        /*  setIsSubmit(true);
        setFormErrors({
          ...formErrors,
          userPhoto: null
        }); */
        return;
      }

      const file: File = e.target.files[0];

      const isValidImg: boolean = imageValidator(file);

      if (isValidImg) {
        /* setFormErrors({
          ...formErrors,
          userPhoto: null
        }); */
        //setIsSubmit(true);
        setUserPhoto(file);
      }
    } catch (err: any) {
      /* setFormErrors({
        ...formErrors,
        userPhoto: err.message
      }); */
      // setIsSubmit(false);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          [e.target.name]: e.target.value,
          userPhoto: profilePic
        };
      }
    });
  };

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFieldDisabled(true);

    const updatedUser: UpdateUserInput = {
      fullName: user?.fullName,
      username: user?.username,
      userPhoto: profilePic
    };

    try {
      const res = await authService.updateUserProfile(updatedUser);

      if (res.id) {
        if (store.auth.user) {
          store.auth.setUser({
            ...store.auth.user,
            fullName: res.fullName,
            username: res.username,
            userPhoto: res.userPhoto
          });
        }
        console.log('successfully updated');
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <div className='w-full sm:w-4/5 sm:mx-auto min-h-[80vh] overflow-auto  text-slate-700 flex flex-col items-center'>
          <form
            className='w-full sm:w-[400px] px-2 flex flex-col justify-center items-center rounded-lg shadow-lg shadow-slate-300'
            onSubmit={updateUser}
          >
            <h2 className='text-2xl font-semibold mb-4 mt-2'>Update Profile</h2>
            <div
              className='flex justify-center items-center mb-5'
              onClick={() => (!isFieldDisabled ? imgRef.current?.click() : '')}
            >
              <div
                className={`h-[120px] w-[120px] rounded-full bg-slate-200 relative border-2 border-slate-400 text-slate-400  ${
                  isFieldDisabled
                    ? 'cursor-not-allowed'
                    : 'hover:cursor-pointer hover:border-slate-700 hover:text-slate-700'
                }`}
              >
                {profilePic ? (
                  <Image
                    src={profilePic ?? ''}
                    alt={user.fullName}
                    width={120}
                    height={120}
                    className='rounded-full w-36 object-cover'
                  />
                ) : (
                  ''
                )}
                <FaRegPlusSquare className='absolute text-2xl text-inherit right-5 bottom-3 z-10' />
              </div>
              <input
                type='file'
                name='userPhoto'
                onChange={handleUserPhoto}
                className='hidden'
                ref={imgRef}
                disabled={isFieldDisabled}
              />
            </div>

            <div className='w-full flex items-center justify-center mb-3'>
              <label htmlFor='username' className='w-[40%] px-2 py-1'>
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                value={user?.username}
                disabled={isFieldDisabled}
                className={`w-[60%] px-2 py-1 bg-slate-100 border-2 border-slate-400 rounded-xl outline-none ${
                  isFieldDisabled
                    ? 'cursor-not-allowed text-slate-500'
                    : 'hover:border-slate-700'
                }`}
                onChange={handleInput}
              />
            </div>
            <div className='w-full flex items-center justify-center mb-3'>
              <label htmlFor='fullName' className='w-[40%] px-2 py-1'>
                Full Name
              </label>
              <input
                type='text'
                id='fullName'
                name='fullName'
                value={user?.fullName}
                disabled={isFieldDisabled}
                className={`w-[60%] px-2 py-1 bg-slate-100 border-2 border-slate-400 rounded-xl outline-none ${
                  isFieldDisabled
                    ? 'cursor-not-allowed text-slate-500'
                    : 'hover:border-slate-700'
                }`}
                onChange={handleInput}
              />
            </div>
            <div className='w-full flex items-center justify-center mb-5'>
              <label htmlFor='email' className='w-[40%] px-2 py-1'>
                Email
              </label>
              <input
                type='text'
                id='email'
                name='email'
                value={user?.email}
                disabled={true}
                className={`w-[60%] px-2 py-1 bg-slate-100 border-2 border-slate-400 rounded-xl outline-none cursor-not-allowed text-slate-500 `}
              />
            </div>
            <div className='w-full px-2 py-1 flex items-center justify-center mb-3'>
              <button
                type='button'
                className={`w-full text-blue-600 border-2 border-blue-600 rounded-md mr-2 outline-none ${
                  !isFieldDisabled
                    ? 'cursor-not-allowed'
                    : 'hover:text-white hover:bg-blue-600'
                }`}
                disabled={!isFieldDisabled}
                onClick={() => setIsFieldDisabled(false)}
              >
                Edit
              </button>
              <button
                type='submit'
                className={`w-full text-green-700 border-2 border-green-700 rounded-md outline-none ${
                  isFieldDisabled
                    ? 'cursor-not-allowed'
                    : 'hover:text-white hover:bg-green-700'
                }`}
                disabled={isFieldDisabled}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>User data not found</div>
      )}
    </div>
  );
};

export default EditProfile;

EditProfile.getLayout = (page: any) => {
  return (
    <>
      <ProtectedRoute role='user'>
        <Header />
        {page}
        <Footer />
      </ProtectedRoute>
    </>
  );
};
