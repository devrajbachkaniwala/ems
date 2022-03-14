import userService from '@/services/userService';
import { Users } from '@/services/userService/__generated__/Users';
import { UserListItem } from './userListItem';
import { FC, useEffect, useState } from 'react';
import { SearchBar } from './searchBar';
import styles from './userListPageStyles.module.css';
import LoadingSpinner from 'components/loadingSpinner';

const UserListPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<Users['users'] | undefined>();

  const [searchedUsers, setSearchedUsers] = useState<
    Users['users'] | undefined
  >();

  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    userService
      .getUsers()
      .then((userList) => {
        if (!userList?.length) {
          return;
        }
        setUsers(userList);
        setSearchedUsers(userList);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (users?.length) {
      if (searchValue) {
        setSearchedUsers(
          users.filter(
            (user) =>
              user.fullName.includes(searchValue) ||
              user.username.includes(searchValue)
          )
        );
      } else {
        setSearchedUsers(users);
      }
    }
  }, [searchValue, users]);

  const moderateUserById = async (userId: string, isActive: boolean) => {
    try {
      const res = await userService.moderateUserById(userId, isActive);
      if (res.id) {
        console.log('successfully moderated');
        setUsers((prevState) => {
          return prevState?.map((user) => {
            if (user.id === res.id) {
              return res;
            }
            return user;
          });
        });
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
        setUsers((prevState) => {
          return prevState?.filter((user) => user.id !== userId);
        });
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  if (!users?.length || isLoading) {
    return (
      <div className='min-h-[100vh] overflow-auto flex justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='min-h-[100vh] overflow-auto px-2 flex flex-col md:items-center'>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={(value) => setSearchValue(value)}
      />
      <section>
        <table className={styles.users}>
          <thead>
            {searchedUsers?.length ? (
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
                <th></th>
              </tr>
            ) : (
              <tr></tr>
            )}
          </thead>
          <tbody>
            {searchedUsers?.length ? (
              searchedUsers.map((user) => {
                return (
                  <UserListItem
                    key={user.id}
                    user={user}
                    moderateUserById={moderateUserById}
                    deleteUserById={deleteUserById}
                    showLoading={(val: boolean) => setIsLoading(val)}
                  />
                );
              })
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>
        {!searchedUsers?.length ? (
          <div className='text-center text-lg font-medium text-slate-700'>
            No Users
          </div>
        ) : (
          ''
        )}
      </section>
    </div>
  );
};

export { UserListPage };
