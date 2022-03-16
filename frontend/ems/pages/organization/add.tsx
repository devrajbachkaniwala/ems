import authService from '@/services/authService';
import orgService from '@/services/orgService';
import { store } from 'app/stores';
import AddEditOrg from 'components/addEditOrg';
import Footer from 'components/footer';
import Header from 'components/header';
import { ProtectedRoute } from 'components/protectedRoute';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { TPageLayout } from 'types/pageLayout';

const AddOrganization: NextPage & TPageLayout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (store.auth.user?.organization?.id) {
      router.replace(`/organization/${store.auth.user?.organization?.id}/edit`);
      return;
    } else {
      setIsLoading(false);
    }

    /*     authService
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
      }); */
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

AddOrganization.getLayout = (page: any) => {
  return (
    <>
      <ProtectedRoute role='organization'>
        <Header />
        {page}
        <Footer />
      </ProtectedRoute>
    </>
  );
};

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
