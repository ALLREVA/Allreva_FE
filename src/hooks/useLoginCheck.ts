import { isAxiosError } from 'axios';
import { useEffect } from 'react';

import { endPoint } from 'constants/endPoint';
import { useAuthStore } from 'stores';
import { publicAxios } from 'utils';

export const useLoginCheck = () => {
  const { isLoggedIn, setIsLoggedIn, setToken, setUserProfile } = useAuthStore([
    'isLoggedIn',
    'setIsLoggedIn',
    'setToken',
    'setUserProfile',
  ]);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchLoginCheck = async () => {
        try {
          const response = await publicAxios.get(endPoint.LOGIN_CHECK, { withCredentials: true });

          const newToken: string = response.headers['authorization'];
          if (newToken) setIsLoggedIn();
          setToken(newToken);
          setUserProfile({
            email: response.data.result.email,
            nickname: response.data.result.nickname,
            profileImageUrl: response.data.result.profileImageUrl,
          });
        } catch (error) {
          if (isAxiosError(error)) {
            // TODO: error 처리
            console.log(error);
          }
        }
      };
      void fetchLoginCheck();
    }
  }, [isLoggedIn]);
};
