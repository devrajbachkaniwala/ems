import orgService from '@/services/orgService';
import { GetOrganization } from '@/services/orgService/__generated__/GetOrganization';
import { store } from 'app/stores/store';
import AddEditOrganization, { TOrganization } from 'components/addEditOrg';
import { GetServerSideProps } from 'next';
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import tokenClass from 'class/Token';
import { useRouter } from 'next/router';

/* type TEditOrganizationProps = {
  organization: GetOrganization['organization'];
}; */

const EditOrganization: FC = () => {
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
    return <div>Loading...</div>;
  }

  return (
    <>
      <AddEditOrganization organization={org} />
    </>
  );
};

export default EditOrganization;

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