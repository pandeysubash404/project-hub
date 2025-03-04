import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { User } from 'types';
import { refetchUserOnError } from 'utils/refetchUserOnError';

type UserData = {
  org: string;
  position: string;
  role: 'admin' | 'project manager' | 'member';
};

const updateUserOrg = async ({
  userId,
  userData,
}: {
  userId: string | undefined;
  userData: UserData;
}): Promise<User> => {
  if (typeof userId === 'undefined') {
    return Promise.reject(new Error('Invalid userId'));
  }
  const { data } = await customAxios.patch<User>(
    `/users/${userId}/orgs`,
    userData
  );
  return data;
};

export const useUpdateUserOrg = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserOrg,
    onSuccess: (data) => {
      queryClient.setQueryData(['auth-user'], data);
    },
    onError: (err) => {
      refetchUserOnError(err, queryClient);
    },
  });
};

const removeUser = async ({userId}: { userId: string; }):Promise<void> => {
  if (!userId) {
    return Promise.reject(new Error('Invalid userId'));
  }
  await customAxios.delete(`/users/${userId}`);
};

export const useRemoveUser = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation(() => removeUser({ userId }), {
    onSuccess: () => {
      // Invalidate relevant queries to trigger a refetch
      queryClient.invalidateQueries(['users']);
    },
    onError: (err) => {
      // Handle error and trigger user refetch if needed
      refetchUserOnError(err, queryClient);
    },
  });
};