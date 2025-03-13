import { useCallback } from 'react';

import { useAuthStore } from 'stores';
import type { UserInfo } from 'types';

export const useUserProfile = () => {
  const { setUserProfile } = useAuthStore(['setUserProfile']);

  const updateUserProfile = useCallback(
    (data: UserInfo) => {
      setUserProfile({
        email: data.email,
        nickname: data.nickname,
        profileImageUrl: data.profileImageUrl,
      });
    },
    [setUserProfile]
  );

  return { updateUserProfile };
};
