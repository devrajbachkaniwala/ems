import authService from '@/services/authService';
import orgService from '@/services/orgService';
import AddEditOrg from 'components/addEditOrg';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const AddOrganization = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    authService
      .getUserProfile()
      .then((res) => {
        if (res.organization?.id) {
          router.push(`/organization/${res.organization.id}/edit`);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err: any) => {
        console.log(JSON.stringify(err));
      });
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AddEditOrg />
    </>
  );
};

export default AddOrganization;
/* 
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const organization = await orgService.getOrganization();

    if (organization.id) {
      return {
        redirect: {
          destination: `organization/${organization.id}/edit`,
          permanent: false
        }
      };
    }

    return {
      props: {}
    };
  } catch (err: any) {
    console.log(err);
    return {
      props: {}
    };
  }
}; */
