import Image from 'next/image';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { FaRegPlusSquare } from 'react-icons/fa';
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

const CreateOrganizationPage = () => {
  const imgRef = useRef<HTMLInputElement | null>(null);

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
  };

  return (
    <div className='h-[80vh]'>
      <div className='w-4/5 mx-auto h-full text-slate-700'>
        <h2 className='text-center text-xl font-semibold mb-4'>
          Add Organization Details
        </h2>
        <form
          className='flex flex-col justify-center items-center'
          onSubmit={handleSubmit}
        >
          <div className='flex justify-center items-center mb-4'>
            <div
              className='h-[120px] w-[120px] rounded-full bg-slate-200 relative hover:cursor-pointer border-2 border-slate-400 hover:border-slate-700 text-slate-400 hover:text-slate-700 transition duration-200 ease-linear'
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
              className='w-[70%] border-2 border-slate-400 px-2 py-1 rounded-md hover:border-slate-700 focus:outline-none focus:border-slate-700 transition duration-200 ease-linear'
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
              className='w-[70%] border-2 border-slate-400 px-2 py-1 rounded-md hover:border-slate-700 focus:outline-none focus:border-slate-700 transition duration-200 ease-linear'
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
              className='w-[70%] border-2 border-slate-400 px-2 py-1 rounded-md hover:border-slate-700 focus:outline-none focus:border-slate-700 transition duration-200 ease-linear'
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
              className='w-[70%] border-2 border-slate-400 px-2 py-1 rounded-md hover:border-slate-700 focus:outline-none focus:border-slate-700 transition duration-200 ease-linear'
            />
          </div>
          <div className='w-full lg:w-[50%]'>
            <button
              type='submit'
              className='w-full py-1 text-blue-600 border-2 border-blue-600 rounded-md hover:text-white hover:bg-blue-600 transition duration-200 ease-linear'
            >
              Add Organization
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrganizationPage;
