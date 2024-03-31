import { useQuery, useQueryClient } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { Organization } from 'types';
import { refetchUserOnError } from 'utils/refetchUserOnError';

const getOrg = async (orgId: string | undefined): Promise<Organization> => {
  if (typeof orgId === 'undefined') {
    return Promise.reject(new Error('Invalid orgId'));
  }
  const { data } = await customAxios.get<Organization>(
    `/organizations/${orgId}`
  );
  return data;
};

const getAllOrgs = async (): Promise<Organization[]> => {
  const { data } = await customAxios.get<Organization[]>('/organizations');
  return data;
};

export const useGetAllOrgs = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['orgs'],
    queryFn: getAllOrgs,
    onError: (er) => {
      refetchUserOnError(er, queryClient);
    },
  });
};


export const useGetOrg = (orgId: string | undefined) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['org', orgId],
    queryFn: () => getOrg(orgId),
    onError: (err) => {
      refetchUserOnError(err, queryClient);
    },
  });
};
