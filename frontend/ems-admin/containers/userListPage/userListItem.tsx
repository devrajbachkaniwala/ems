import { Users_users } from '@/services/userService/__generated__/Users';
import Link from 'next/link';
import { FC, MouseEventHandler, useState } from 'react';

type TUserListItemProps = {
  user: Users_users;
  moderateUserById: (userId: string, isActive: boolean) => Promise<void>;
  deleteUserById: (userId: string) => Promise<void>;
  showLoading: (val: boolean) => void;
};

const UserListItem: FC<TUserListItemProps> = ({
  user,
  moderateUserById,
  deleteUserById,
  showLoading
}) => {
  const { id, username, fullName, email, isActive } = user;
  const [activate, setActivate] = useState<boolean>(isActive);

  const handleModerate: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      await moderateUserById(id, !activate);
      setActivate((prevState) => !prevState);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{username}</td>
      <td>{fullName}</td>
      <td>{email}</td>
      <td className='flex'>
        <Link href={`/users/${id}`}>
          <a
            className='px-1 mr-1 text-center w-full border-2 border-blue text-blue hover:text-white hover:bg-blue transition-all duration-200 ease-out font-medium rounded-md leading-4'
            onClick={() => showLoading(true)}
          >
            Show more
          </a>
        </Link>
        {activate ? (
          <button
            type='button'
            onClick={handleModerate}
            className='px-1 mr-1 w-full border-2 border-red-600 text-red-600 font-medium rounded-md hover:text-white hover:bg-red-600 transition-all duration-200 ease-out'
          >
            Disable
          </button>
        ) : (
          <button
            type='button'
            onClick={handleModerate}
            className='px-1 mr-1 w-full border-2 border-green-700 text-green-700 font-medium rounded-md hover:text-white hover:bg-green-700 transition-all duration-200 ease-out'
          >
            Activate
          </button>
        )}
        <button
          type='button'
          onClick={() => deleteUserById(id)}
          className='px-1 w-full border-2 border-red-600 text-red-600 font-medium rounded-md hover:text-white hover:bg-red-600 transition-all duration-200 ease-out'
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export { UserListItem };
