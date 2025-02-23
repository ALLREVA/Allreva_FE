import { isAxiosError } from 'axios';
import { useEffect } from 'react';

import { useSSE } from './useSSE';

import { endPoint } from 'constants/endPoint';
import { requestPermission } from 'firebase-messaging-sw';
import { useAuthStore } from 'stores';
import { publicAxios } from 'utils';

export const useLoginCheck = () => {
  const { setIsLoggedIn, setToken, setUserProfile } = useAuthStore([
    'setIsLoggedIn',
    'setToken',
    'setUserProfile',
  ]);
  const { subscribeSSE } = useSSE();

  useEffect(() => {
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

        subscribeSSE(newToken);

        void requestPermission();
      } catch (error) {
        if (isAxiosError(error)) {
          // TODO: error 처리
          console.log(error);
        }
      }
    };
    void fetchLoginCheck();
  }, []);
};
