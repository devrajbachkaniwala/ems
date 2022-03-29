import orgService from '@/services/orgService';
import { GetOrganization } from '@/services/orgService/__generated__/GetOrganization';
import { store } from 'app/stores';
import AddEditOrganization, { TOrganization } from 'components/addEditOrg';
import { GetServerSideProps, NextPage } from 'next';
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import tokenClass from 'class/Token';
import { useRouter } from 'next/router';
import { TPageLayout } from 'types/pageLayout';
import Header from 'components/header';
import Footer from 'components/footer';
import { ProtectedRoute } from 'components/protectedRoute';
import LoadingSpinner from 'components/loadingSpinner';

/* type TEditOrganizationProps = {
  organization: GetOrganization['organization'];
}; */

const EditOrganization: NextPage & TPageLayout = () => {
  const [org, setOrg] = useState<TOrganization | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const orgId = router.query.orgId as string;

  useEffect(() => {
    if (orgId) {
      orgService
        .getOrganizationById(orgId)
        .then((res) => {
          const { __typename, id, ...rest } = res;
          setOrg(rest);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
          router.push('/organization/add');
        });
    }
  }, [orgId, router]);

  if (!org && isLoading) {
    return (
      <div className='min-h-[80vh] overflow-auto flex justify-center fade-in-out'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <AddEditOrganization organization={org} />
    </>
  );
};

export default EditOrganization;

EditOrganization.getLayout = (page: any) => {
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

/* export const getServerSideProps: GetServerSideProps<
  TEditOrganizationProps
> = async (ctx) => {
  try {
    const { params, req } = ctx;
    const orgId = params?.orgId;

    if (!orgId) {
      return {
        redirect: {
          destination: '/organization/add',
          permanent: false
        }
      };
    }

    const organization = await orgService.getOrganizationById(orgId as string);

    return {
      props: {
        organization
      }
    };
  } catch (err: any) {
    console.log(err);
    return {
      redirect: {
        destination: '/organization/add',
        permanent: false
      }
    };
  }
};
 */
