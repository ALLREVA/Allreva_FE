import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getUserInfo } from 'api/userApi';
import { useUserProfile } from 'hooks';

export const useGetUserInfo = () => {
  const { updateUserProfile } = useUserProfile();

  const query = useSuspenseQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      updateUserProfile(query.data);
    }
  }, [query.data, updateUserProfile]);

  return query;
};
