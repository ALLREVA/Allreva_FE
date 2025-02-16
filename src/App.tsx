import styled from '@emotion/styled';
import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { requestPermission } from './firebase-messaging-sw';

import { endPoint } from 'constants/endPoint';
import { useScreenSize } from 'hooks';
import { router } from 'routes/routes';
import { authStore, useAuthStore } from 'stores';
import GlobalStyle from 'styles/GlobalStyle';
import { publicAxios } from 'utils';

function App() {
  const isLoggedIn = useAuthStore(['isLoggedIn']);

  useScreenSize();

  useEffect(() => {
    if (isLoggedIn) {
      const fetchLoginCheck = async () => {
        try {
          const response = await publicAxios.get(endPoint.LOGIN_CHECK, { withCredentials: true });

          const newToken: string = response.headers['authorization'];
          authStore.getState().setToken(newToken);

          void requestPermission();
        } catch (error) {
          console.error('새로고침시 data 요청 에러', error);
        }
      };

      void fetchLoginCheck();
    }
  }, [isLoggedIn]);

  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<div>loading...</div>}>
        <MobileWrapper>
          <RouterProvider router={router} />
        </MobileWrapper>
      </Suspense>
    </>
  );
}

const MobileWrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  min-height: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.black};

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;
