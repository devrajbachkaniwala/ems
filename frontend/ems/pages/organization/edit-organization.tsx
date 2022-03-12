import Image from 'next/image';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { FaRegPlusSquare, FaTrashAlt } from 'react-icons/fa';
import { imageValidator } from 'utils/imageValidator';

type TFormValues = {
  name: string;
  description: string;
  contactNo: string;
  email: string;
  photo: string;
};

const initialFormValues: TFormValues = {
  photo: '',
  name: '',
  description: '',
  contactNo: '',
  email: ''
};

const EditOrganizationPage = () => {
  const imgRef = useRef<HTMLInputElement | null>(null);

  const [isFieldDisabled, setIsFieldDisabled] = useState<boolean>(true);

  const [formValues, setFormValues] = useState<TFormValues>(initialFormValues);

  const setOrgPhoto = (imgFile: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = () => {
      setFormValues({
        ...formValues,
        photo: reader.result as string
      });
    };
  };

  const handleOrgPhoto = (e: ChangeEvent<HTMLInputElement>): void => {
    try {
      setFormValues({
        ...formValues,
        photo: ''
      });
      if (!e.target.files?.length) {
        /* setIsSubmit(true);
        setFormErrors({
          ...formErrors,
          userPhoto: null,
        }); */
        return;
      }

      const file: File = e.target.files[0];

      const isValidImg: boolean = imageValidator(file);

      if (isValidImg) {
        /* setFormErrors({
          ...formErrors,
          userPhoto: null,
        }); */
        //setIsSubmit(true);
        setOrgPhoto(file);
      }
    } catch (err: any) {
      /* setFormErrors({
        ...formErrors,
        userPhoto: err.message,
      });
      setIsSubmit(false); */
      console.log(err);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
    setIsFieldDisabled(true);
  };

  return (
    <div className='h-[80vh]'>
      <div className='w-4/5 mx-auto h-full text-slate-700'>
        <h2 className='text-center text-xl font-semibold mb-4'>
          Update Organization Details
        </h2>
        <form
          className='flex flex-col justify-center items-center'
          onSubmit={handleSubmit}
        >
          <div className='flex justify-center items-center mb-4'>
            <div
              className={`h-[120px] w-[120px] rounded-full bg-slate-200 relative border-2 border-slate-400  text-slate-400  transition duration-200 ease-linear ${
                isFieldDisabled
                  ? 'hover:cursor-not-allowed'
                  : 'hover:cursor-pointer hover:border-slate-700 hover:text-slate-700'
              }`}
              onClick={() => imgRef.current?.click()}
            >
              {formValues.photo && (
                <Image
                  src={`${formValues.photo}`}
                  alt='orgPhoto'
                  width={120}
                  height={120}
                  className='rounded-full w-36 object-cover'
                />
              )}
              <FaRegPlusSquare className='absolute text-2xl text-inherit right-5 bottom-3 z-10' />
            </div>
            <input
              type='file'
              name='orgPhoto'
              onChange={handleOrgPhoto}
              className='hidden'
              ref={imgRef}
              disabled={isFieldDisabled}
            />
          </div>

          <div className='flex justify-between w-full lg:w-[50%] mb-4'>
            <label htmlFor='name' className='w-[30%] px-2 py-1'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formValues.name}
              onChange={handleChange}
              placeholder='Enter organization name'
              className={`w-[70%] border-2 border-slate-400 px-2 py-1 rounded-md focus:outline-none focus:border-slate-700 transition duration-200 ease-linear ${
                isFieldDisabled
                  ? 'hover:cursor-not-allowed'
                  : 'hover:border-slate-700'
              }`}
              disabled={isFieldDisabled}
            />
          </div>
          <div className='flex justify-between w-full lg:w-[50%] mb-4'>
            <label htmlFor='description' className='w-[30%] px-2 py-1'>
              Description
            </label>
            <textarea
              id='description'
              name='description'
              value={formValues.description}
              onChange={handleChange}
              placeholder='Enter organization description'
              className={`w-[70%] border-2 border-slate-400 px-2 py-1 rounded-md focus:outline-none focus:border-slate-700 transition duration-200 ease-linear ${
                isFieldDisabled
                  ? 'hover:cursor-not-allowed'
                  : 'hover:border-slate-700'
              }`}
              disabled={isFieldDisabled}
            />
          </div>
          <div className='flex justify-between w-full lg:w-[50%] mb-4'>
            <label htmlFor='contactNo' className='w-[30%] px-2 py-1'>
              Contact No
            </label>
            <input
              type='text'
              id='contactNo'
              name='contactNo'
              value={formValues.contactNo}
              onChange={handleChange}
              placeholder='Enter organization contact no'
              className={`w-[70%] border-2 border-slate-400 px-2 py-1 rounded-md focus:outline-none focus:border-slate-700 transition duration-200 ease-linear ${
                isFieldDisabled
                  ? 'hover:cursor-not-allowed'
                  : 'hover:border-slate-700'
              }`}
              disabled={isFieldDisabled}
            />
          </div>
          <div className='flex justify-between w-full lg:w-[50%] mb-4'>
            <label htmlFor='email' className='w-[30%] px-2 py-1'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formValues.email}
              onChange={handleChange}
              placeholder='Enter organization email'
              className={`w-[70%] border-2 border-slate-400 px-2 py-1 rounded-md focus:outline-none focus:border-slate-700 transition duration-200 ease-linear ${
                isFieldDisabled
                  ? 'hover:cursor-not-allowed'
                  : 'hover:border-slate-700'
              }`}
              disabled={isFieldDisabled}
            />
          </div>
          <div className='w-full lg:w-[50%] flex'>
            <button
              type='button'
              className={`w-[50%] mr-2 py-1 text-blue-600 border-2 border-blue-600 rounded-md transition duration-200 ease-linear ${
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
              className={`w-[50%] py-1 mr-2 text-green-700 border-2 border-green-700 rounded-md transition duration-200 ease-linear ${
                isFieldDisabled
                  ? 'cursor-not-allowed'
                  : 'hover:text-white hover:bg-green-700'
              }`}
              disabled={isFieldDisabled}
            >
              Save
            </button>
            <button
              type='button'
              className={`w-[50%] py-1 text-red-600 border-2 border-red-600 rounded-md flex justify-center items-center hover:text-white hover:bg-red-600 transition duration-200 ease-linear`}
            >
              <FaTrashAlt className='mr-1' />
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrganizationPage;
