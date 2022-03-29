import authService from '@/services/authService';
import { store } from 'app/stores';
import { UserValidation } from 'class/UserValidation';
import Footer from 'components/footer';
import Header from 'components/header';
import LoadingSpinner from 'components/loadingSpinner';
import { ProtectedRoute } from 'components/protectedRoute';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  ChangeEvent,
  FC,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { FaRegPlusSquare } from 'react-icons/fa';
import { TPageLayout } from 'types/pageLayout';
import { imageValidator } from 'utils/imageValidator';
import { UpdateUserInput } from '__generated__/globalTypes';
import { UserProfile } from '../app/services/authService/__generated__/UserProfile';

const EditProfile: NextPage & TPageLayout = () => {
  const [formValues, setFormValues] = useState<
    UserProfile['user'] | undefined
  >();

  const [formErrors, setFormErrors] = useState<Partial<UserProfile['user']>>(
    {}
  );
  //const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFieldDisabled, setIsFieldDisabled] = useState<boolean>(true);

  const imgRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFormValues(store.auth.user);
  }, []);

  const setUserPhoto = (imgFile: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = () => {
      setFormValues((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            userPhoto: reader.result as string
          };
        }
      });
    };
  };

  const handleUserPhoto = (e: ChangeEvent<HTMLInputElement>): void => {
    try {
      /* setFormValues((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            userPhoto: ''
          };
        }
      }); */
      if (!e.target.files?.length) {
        setFormErrors((prevState) => ({
          ...prevState,
          userPhoto: ''
        }));
        return;
      }

      const file: File = e.target.files[0];

      const isValidImg: boolean = imageValidator(file);

      if (isValidImg) {
        setFormErrors((prevState) => ({
          ...prevState,
          userPhoto: ''
        }));
        setUserPhoto(file);
      }
    } catch (err: any) {
      setFormErrors((prevState) => ({
        ...prevState,
        userPhoto: err.message
      }));
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          [e.target.name]: e.target.value
        };
      }
    });
  };

  const validate = async () => {
    const isValidUsername: boolean = await UserValidation.username(
      formValues?.username ?? ''
    )
      .then((res) => {
        setFormErrors((prevState) => ({ ...prevState, username: '' }));
        return res;
      })
      .catch((err) => {
        setFormErrors((prevState) => ({ ...prevState, username: err.message }));
        return false;
      });

    const isValidFullName: boolean = await UserValidation.fullName(
      formValues?.fullName ?? ''
    )
      .then((res) => {
        setFormErrors((prevState) => ({ ...prevState, fullName: '' }));
        return res;
      })
      .catch((err) => {
        setFormErrors((prevState) => ({ ...prevState, fullName: err.message }));
        return false;
      });

    const isValidImg = formErrors.userPhoto ? false : true;

    if (!(isValidUsername && isValidFullName && isValidImg)) {
      return false;
    }
    return true;
  };

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await validate();

    if (!isValid) {
      console.log('validation error');
      return;
    }

    const updatedUser: UpdateUserInput = {
      username: formValues?.username,
      userPhoto: formValues?.userPhoto,
      fullName: formValues?.fullName
    };

    try {
      const res = await authService.updateUserProfile(updatedUser);
      setIsFieldDisabled(true);

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

  if (!formValues) {
    return (
      <div className='min-h-[80vh] overflow-auto flex justify-center fade-in-out'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className=''>
      {formValues ? (
        <div className='w-full sm:w-4/5 sm:mx-auto min-h-[80vh] overflow-auto text-slate-700 flex flex-col items-center'>
          <form
            className='w-full sm:w-[400px] px-2 flex flex-col justify-center items-center rounded-lg shadow-lg shadow-slate-300'
            onSubmit={updateUser}
          >
            <h2 className='text-2xl font-semibold mb-4 mt-2'>Update Profile</h2>

            {formErrors.userPhoto && (
              <div className='input-error text-center'>
                {formErrors.userPhoto}
              </div>
            )}

            <div
              className='flex justify-center items-center mb-5'
              onClick={() => (!isFieldDisabled ? imgRef.current?.click() : '')}
            >
              <div
                className={`h-[120px] w-[120px] rounded-full bg-slate-200 relative border-2 border-slate-400 text-slate-400 transition-all duration-200 ease-in-out ${
                  isFieldDisabled
                    ? 'cursor-not-allowed'
                    : 'hover:cursor-pointer hover:border-slate-700 hover:text-slate-700'
                }`}
              >
                {formValues.userPhoto ? (
                  <Image
                    src={formValues.userPhoto}
                    alt={formValues.fullName}
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

            {formErrors.username && (
              <div className='w-full flex'>
                <div className='w-[40%]'></div>
                <div className='input-error w-[60%]'>{formErrors.username}</div>
              </div>
            )}

            <div className='w-full flex items-center justify-center mb-3'>
              <label htmlFor='username' className='w-[40%] px-2 py-1'>
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                value={formValues?.username}
                disabled={isFieldDisabled}
                className={`w-[60%] px-2 py-1 bg-slate-100 border-2 border-slate-400 rounded-xl outline-none transition-all duration-200 ease-in-out ${
                  isFieldDisabled
                    ? 'cursor-not-allowed text-slate-500'
                    : 'hover:border-slate-700'
                }`}
                onChange={handleInput}
              />
            </div>

            {formErrors.fullName && (
              <div className='w-full flex'>
                <div className='w-[40%]'></div>
                <div className='input-error w-[60%]'>{formErrors.fullName}</div>
              </div>
            )}

            <div className='w-full flex items-center justify-center mb-3'>
              <label htmlFor='fullName' className='w-[40%] px-2 py-1'>
                Full Name
              </label>
              <input
                type='text'
                id='fullName'
                name='fullName'
                value={formValues?.fullName}
                disabled={isFieldDisabled}
                className={`w-[60%] px-2 py-1 bg-slate-100 border-2 border-slate-400 rounded-xl outline-none transition-all duration-200 ease-in-out ${
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
                value={formValues?.email}
                disabled={true}
                className={`w-[60%] px-2 py-1 bg-slate-100 border-2 border-slate-400 rounded-xl outline-none cursor-not-allowed text-slate-500 transition-all duration-200 ease-in-out`}
              />
            </div>
            <div className='w-full px-2 py-1 flex items-center justify-center mb-3'>
              <button
                type='button'
                className={`w-full text-blue-600 border-2 border-blue-600 rounded-md mr-2 outline-none transition-all duration-200 ease-in-out ${
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
                className={`w-full text-green-700 border-2 border-green-700 rounded-md outline-none transition-all duration-200 ease-in-out ${
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
