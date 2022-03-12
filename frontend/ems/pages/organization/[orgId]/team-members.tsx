/* eslint-disable @next/next/no-img-element */
import { MdDelete } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { FormEvent, useEffect, useState } from 'react';
import {
  OrganizationTeamMembers,
  OrganizationTeamMembers_organization
} from '@/services/orgService/__generated__/OrganizationTeamMembers';
import authService from '@/services/authService';
import orgService from '@/services/orgService';
import { useRouter } from 'next/router';

/* type TTeamMember = {
  id: number;
  user: {
    id: number;
    username: string;
    fullName: string;
    email: string;
    userPhoto: string;
  };
}; */

/* const teamMembersData: TTeamMember[] = [
  {
    id: 1,
    user: {
      id: 101,
      username: 'testusername',
      fullName: 'test Full name',
      email: 'test1@t.com',
      userPhoto: '/images/event-pic-1.jpg'
    }
  },
  {
    id: 2,
    user: {
      id: 102,
      username: 'testusername2',
      fullName: 'Full name',
      email: 'test2@t.com',
      userPhoto: '/images/event-pic-2.jpg'
    }
  },
  {
    id: 3,
    user: {
      id: 103,
      username: 'testusername3',
      fullName: 'tFull name',
      email: 'test3@t.com',
      userPhoto: '/images/event-pic-2.jpg'
    }
  },
  {
    id: 4,
    user: {
      id: 104,
      username: 'testusername3',
      fullName: 'tFull name',
      email: 'test3@t.com',
      userPhoto: '/images/event-pic-2.jpg'
    }
  }
]; */

const TeamMembers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [teamMembers, setTeamMembers] = useState<
    OrganizationTeamMembers['organization']['teamMembers'] | undefined
  >();
  const [userId, setUserId] = useState<string | undefined>();
  const [emailInput, setEmailInput] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    authService
      .getUserProfile()
      .then((user) => {
        if (!user.organization?.id) {
          router.replace('/organization/add');
          return;
        }
        orgService
          .getOrgTeamMembers()
          .then((org) => {
            if (user.organization?.id === org.id) {
              setUserId(user.id);
              setIsLoading(false);
              setTeamMembers(org.teamMembers);
            } else {
              console.log('User org does not match team member org');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        router.replace('/login');
      });
  }, [router]);

  const addTeamMember = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await orgService.addTeamMember(emailInput);

      if (res.id) {
        console.log('successfully added');
        setErrMsg(null);
        setEmailInput('');

        setTeamMembers((prevState) => {
          if (prevState?.length) {
            return [...prevState, res];
          }
        });
      }
    } catch (err: any) {
      console.log(err);
      setErrMsg(err.message);
    }
  };

  const removeTeamMember = async (email: string) => {
    try {
      const res = await orgService.removeTeamMember(email);

      if (res) {
        console.log('successfully removed');
        setErrMsg(null);

        setTeamMembers((prevState) => {
          return prevState?.filter((member) => {
            return member.user?.email !== email;
          });
        });
      }
    } catch (err: any) {
      console.log(err);
      setErrMsg(err.message);
    }
  };

  if (!teamMembers?.length && isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-[80vh] overflow-auto'>
      <div className='min-w-[625px] sm:w-full lg:w-4/5 mx-auto text-slate-700 overflow-auto'>
        <div className='flex flex-col justify-center items-center'>
          {errMsg && <span>{errMsg}</span>}
          <form action='POST' onSubmit={addTeamMember}>
            <div className='flex'>
              <input
                type='email'
                placeholder='Enter email'
                className='flex-grow border-2 border-slate-400 rounded-md px-2 py-1 hover:border-slate-700 focus:outline-none focus:border-slate-700 transition duration-200 ease-linear'
                name='email'
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <button
                type='submit'
                className='px-2 py-1 ml-2 text-blue-600 border-2 rounded-md border-blue-600 hover:text-white hover:bg-blue-600 transition duration-200 ease-linear'
              >
                Add Team Member
              </button>
            </div>
          </form>
        </div>

        <h2 className='text-center text-xl font-semibold mt-4 mb-2'>
          My Team Members
        </h2>

        <div className='flex flex-col justify-center items-center'>
          <article className='flex items-center p-2 my-2 justify-between w-full xl:w-[70%] bg-slate-100 rounded-md border-b-2 border-slate-400'>
            {'User Photo, Username, Full Name, Email, Remove Member'
              .split(', ')
              .map((item) => {
                return (
                  <p key={item} className='w-[20%] text-center'>
                    {item}
                  </p>
                );
              })}
          </article>
          {teamMembers?.length ? (
            <>
              {teamMembers.map((teamMember) => {
                return (
                  <article
                    key={teamMember.id}
                    className='flex items-center p-2 my-2 justify-between w-full xl:w-[70%] border-b-2 border-slate-400 rounded-md hover:shadow-md hover:shadow-slate-400 transition duration-200 ease-linear'
                  >
                    <div className='w-[20%] flex justify-center items-center'>
                      <img
                        src={teamMember.user?.userPhoto ?? ''}
                        alt={teamMember.user?.fullName}
                        className='h-[120px] w-[120px] rounded-full object-cover'
                      />
                    </div>
                    <p className='w-[20%] text-center'>
                      {teamMember.user?.username}
                    </p>
                    <p className='w-[20%] text-center'>
                      {teamMember.user?.fullName}
                    </p>
                    <p className='w-[20%] text-center'>
                      {teamMember.user?.email}
                    </p>
                    <button
                      type='button'
                      className={`w-[20%] py-1 text-red-600 border-2 rounded-md border-red-600 flex justify-center items-center transition duration-200 ease-linear ${
                        userId && userId === teamMember.user?.id
                          ? 'cursor-not-allowed'
                          : 'hover:text-white hover:bg-red-600'
                      }`}
                      disabled={!!(userId && userId === teamMember.user?.id)}
                      onClick={() =>
                        removeTeamMember(teamMember.user?.email ?? '')
                      }
                    >
                      {' '}
                      <FaTrashAlt className='text-lg mr-1' /> Remove
                    </button>
                  </article>
                );
              })}
            </>
          ) : (
            <div>No Team Members</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;