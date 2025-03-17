import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getUserInfo } from 'api/userApi';
import { useUserProfile } from 'hooks';

export const useGetUserInfo = () => {
  const { updateUserProfile } = useUserProfile();

  const query = useSuspenseQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  useEffect(() => {
    if (query.data) {
      updateUserProfile(query.data);
    }
  }, [query.data, updateUserProfile]);

  return query;
};
