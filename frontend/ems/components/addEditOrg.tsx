import Image from 'next/image';
import {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEventHandler,
  useRef,
  useState
} from 'react';
import { FaRegPlusSquare, FaTrashAlt } from 'react-icons/fa';
import { imageValidator } from 'utils/imageValidator';
import orgService from '@/services/orgService';
import { GetOrganization_organization } from '@/services/orgService/__generated__/GetOrganization';
import { useRouter } from 'next/router';
import { OrgValidation } from 'class/orgValidation';
import { store } from 'app/stores';

export type TOrganization = {
  name: string;
  description: string;
  contactNo: string;
  email: string;
  photo: string;
};

const initialFormValues: TOrganization = {
  photo: '',
  name: '',
  description: '',
  contactNo: '',
  email: ''
};

const initialFormErrors: Partial<TOrganization> = {
  photo: '',
  name: '',
  description: '',
  contactNo: '',
  email: ''
};

type TAddEditOrganizationProps = {
  organization?: TOrganization;
};

const AddEditOrganization: FC<TAddEditOrganizationProps> = (props) => {
  const organization = props?.organization;
  const isAddMode = !organization;
  const imgRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const [isFieldDisabled, setIsFieldDisabled] = useState<boolean>(
    isAddMode ? false : true
  );

  const [formValues, setFormValues] = useState<TOrganization>(
    organization ? organization : initialFormValues
  );

  const [formErrors, setFormErrors] =
    useState<Partial<TOrganization>>(initialFormErrors);

  const [file, setFile] = useState<string>('');

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
      setFormValues((prevState) => ({
        ...prevState,
        photo: ''
      }));
      if (!e.target.files?.length) {
        setFormErrors((prevState) => ({
          ...prevState,
          photo: 'Organization Photo is required'
        }));

        return;
      }

      const file: File = e.target.files[0];

      const isValidImg: boolean = imageValidator(file);

      if (isValidImg) {
        setFormErrors((prevState) => ({
          ...prevState,
          photo: ''
        }));
        setOrgPhoto(file);
      }
    } catch (err: any) {
      setFormErrors((prevState) => ({
        ...prevState,
        photo: err.message
      }));
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

  const validate = async (): Promise<boolean> => {
    const name = await OrgValidation.orgName(formValues.name)
      .then((res) => {
        setFormErrors((prevState) => ({ ...prevState, name: '' }));
        return res;
      })
      .catch((err) => {
        setFormErrors((prevState) => ({ ...prevState, name: err.message }));
        return false;
      });

    const description = await OrgValidation.description(formValues.description)
      .then((res) => {
        setFormErrors((prevState) => ({ ...prevState, description: '' }));
        return res;
      })
      .catch((err) => {
        setFormErrors((prevState) => ({
          ...prevState,
          description: err.message
        }));
        return false;
      });

    const contactNo = await OrgValidation.contactNo(formValues.contactNo)
      .then((res) => {
        setFormErrors((prevState) => ({ ...prevState, contactNo: '' }));
        return res;
      })
      .catch((err) => {
        setFormErrors((prevState) => ({
          ...prevState,
          contactNo: err.message
        }));
        return false;
      });

    const email = await OrgValidation.email(formValues.email)
      .then((res) => {
        setFormErrors((prevState) => ({ ...prevState, email: '' }));
        return res;
      })
      .catch((err) => {
        setFormErrors((prevState) => ({
          ...prevState,
          email: err.message
        }));
        return false;
      });

    const photo = await new Promise((resolve, reject) => {
      if (!formValues.photo) {
        setFormErrors((prevState) => ({
          ...prevState,
          photo: 'Organization photo is required'
        }));
        reject(false);
      }
      if (formErrors.photo) {
        reject(false);
      }
      resolve(true);
    })
      .then((res) => {
        setFormErrors((prevState) => ({ ...prevState, photo: '' }));
        return res;
      })
      .catch((err) => err);

    if (!(name && description && contactNo && email && photo)) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await validate();

    if (!isValid) {
      console.log('validate error');
      return;
    }

    if (isAddMode) {
      try {
        const res = await orgService.createOrganization(formValues);
        console.log(res);
        if (res.id) {
          if (store.auth.user) {
            store.auth.setUser({ ...store.auth.user, organization: res });
            router.replace(`/organization/${res.id}/edit`);
          }
        }
      } catch (err: any) {
        console.log(JSON.stringify(err));
      }
    } else {
      try {
        const res = await orgService.updateOrganization(formValues);
        setIsFieldDisabled(true);
        console.log(res);
      } catch (err: any) {
        console.log(JSON.stringify(err));
      }
    }
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      e.preventDefault();
      const res = await orgService.deleteOrganization();
      if (res) {
        if (store.auth.user) {
          store.auth.setUser({ ...store.auth.user, organization: null });
          router.replace('/organization/add');
        }
      }
    } catch (err: any) {
      console.log(JSON.stringify(err));
    }
  };

  return (
    <div className='h-[80vh]'>
      <div className='w-4/5 mx-auto h-full text-slate-700'>
        <h2 className='text-center text-xl font-semibold mb-4'>
          {isAddMode ? 'Add Organization' : 'Update Organization Details'}
        </h2>
        <form
          className='flex flex-col justify-center items-center'
          onSubmit={handleSubmit}
        >
          {formErrors.photo && (
            <div className='input-error'>{formErrors.photo}</div>
          )}

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

          {formErrors.name && (
            <div className='flex justify-between w-full lg:w-[50%]'>
              <div className='w-[30%]'></div>
              <div className='input-error w-[70%]'>{formErrors.name}</div>
            </div>
          )}

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

          {formErrors.description && (
            <div className='flex justify-between w-full lg:w-[50%]'>
              <div className='w-[30%]'></div>
              <div className='input-error w-[70%]'>
                {formErrors.description}
              </div>
            </div>
          )}

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

          {formErrors.contactNo && (
            <div className='flex justify-between w-full lg:w-[50%]'>
              <div className='w-[30%]'></div>
              <div className='input-error w-[70%]'>{formErrors.contactNo}</div>
            </div>
          )}

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

          {formErrors.email && (
            <div className='flex justify-between w-full lg:w-[50%]'>
              <div className='w-[30%]'></div>
              <div className='input-error w-[70%]'>{formErrors.email}</div>
            </div>
          )}

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
            {isAddMode ? (
              <button
                type='submit'
                className='w-full py-1 text-blue-600 border-2 border-blue-600 rounded-md hover:text-white hover:bg-blue-600 transition duration-200 ease-linear'
              >
                Add Organization
              </button>
            ) : (
              <>
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
                  onClick={handleDelete}
                >
                  <FaTrashAlt className='mr-1' />
                  Delete
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditOrganization;
