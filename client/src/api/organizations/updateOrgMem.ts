import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customAxios } from 'lib/axios';
import { Organization } from 'types';
import { refetchUserOnError } from 'utils/refetchUserOnError';

const removeOrgMem = async ({
    orgId,
    memberId
  }: {
    orgId: string;
    memberId: string;
  }): Promise<Organization> => {
    const { data } = await customAxios.patch<Organization>(
      `/organizations/${orgId}/${memberId}`,
      { remove: true } // Indicates that a member should be removed
    );
    return data;
  };
  
  export const useRemoveOrgMem = (orgId:string, memberId:string) => {
    const queryClient = useQueryClient();
    console.log("useRemoveOrgMem: ",orgId,memberId);
    return useMutation(() => removeOrgMem({ orgId, memberId }), {
      onSuccess: () => {
        // Invalidate relevant queries to trigger a refetch
        queryClient.invalidateQueries(['orgs']);
        queryClient.invalidateQueries(['org', orgId]);
      },
      onError: (err) => {
        // Handle error and trigger user refetch if needed
        refetchUserOnError(err, queryClient);
      },
    });
  };
  