import userService from '@/services/userService';
import {
  UserDetail,
  UserDetail_userById
} from '@/services/userService/__generated__/UserDetail';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import styles from './userDetailPageStyles.module.css';

type TUserTableProps = {
  user: UserDetail_userById;
};

const UserTable: FC<TUserTableProps> = ({ user }) => {
  const { id, username, fullName, email, role, isActive, userPhoto } = user;
  const [activate, setActivate] = useState<boolean>(isActive);

  const router = useRouter();

  const moderateUserById = async (userId: string, isActive: boolean) => {
    try {
      const res = await userService.moderateUserById(userId, isActive);
      if (res.id) {
        console.log('successfully moderated');
        setActivate(res.isActive);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const deleteUserById = async (userId: string) => {
    try {
      const res = await userService.deleteUserById(userId);
      if (res) {
        console.log('successfully deleted');
        router.replace('/users');
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <section className='w-full sm:w-[400px] mx-auto text-slate-700'>
      <div className='flex justify-center my-4'>
        {userPhoto ? (
          <Image
            src={userPhoto}
            alt={username}
            width={120}
            height={120}
            className='rounded-full object-cover'
          />
        ) : (
          <div className='h-[120px] w-[120px] bg-slate-200 rounded-full'></div>
        )}
      </div>
      <div className='flex justify-center mb-2 bg-slate-100 px-2 py-1 rounded-md'>
        <div className='w-full'>ID</div>
        <div className='w-full'>{id}</div>
      </div>

      <div className='flex justify-center mb-2 bg-slate-100 px-2 py-1 rounded-md'>
        <div className='w-full'>Username</div>
        <div className='w-full'>{username}</div>
      </div>

      <div className='flex justify-center mb-2 bg-slate-100 px-2 py-1 rounded-md'>
        <div className='w-full'>Full Name</div>
        <div className='w-full'>{fullName}</div>
      </div>

      <div className='flex justify-center mb-2 bg-slate-100 px-2 py-1 rounded-md'>
        <div className='w-full'>Email</div>
        <div className='w-full'>{email}</div>
      </div>

      <div className='flex justify-center mb-4 bg-slate-100 px-2 py-1 rounded-md'>
        <div className='w-full'>Role</div>
        <div className='w-full'>{role}</div>
      </div>

      <div className='flex justify-center'>
        {activate ? (
          <button
            onClick={() => moderateUserById(id, !activate)}
            className='w-full px-1 mr-2 border-2 border-red-600 text-red-600 font-medium rounded-md hover:text-white hover:bg-red-600 transition-all duration-200 ease-out'
          >
            Disable
          </button>
        ) : (
          <button
            onClick={() => moderateUserById(id, !activate)}
            className='w-full px-1 mr-2 border-2 border-green-700 text-green-700 font-medium rounded-md hover:text-white hover:bg-green-700 transition-all duration-200 ease-out'
          >
            Activate
          </button>
        )}
        <button
          onClick={() => deleteUserById(id)}
          className='w-full px-1 border-2 border-red-600 text-red-600 font-medium rounded-md hover:text-white hover:bg-red-600 transition-all duration-200 ease-out'
        >
          Delete
        </button>
      </div>
    </section>
  );
};

export default UserTable;
