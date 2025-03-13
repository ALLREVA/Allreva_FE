import styled from '@emotion/styled';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

import { useLoginCheck, useScreenSize } from 'hooks';
import { router } from 'routes/routes';
import GlobalStyle from 'styles/GlobalStyle';

function App() {
  useScreenSize();
  useLoginCheck();

  return (
    <>
      <GlobalStyle />
      <Suspense
        fallback={
          <SuspenseWrapper>
            <MoonLoader color="#5E45BF" />
          </SuspenseWrapper>
        }
      >
        <MobileWrapper>
          <RouterProvider future={{ v7_startTransition: true }} router={router} />
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

const SuspenseWrapper = styled(MobileWrapper)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;
