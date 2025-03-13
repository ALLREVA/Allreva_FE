import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

import BottomNav from 'components/bottomNav/BottomNav';
import Header from 'components/header/Header';

export const HeaderLayout = () => {
  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <MainWrapper>
        <Outlet />
      </MainWrapper>
      <BottomNav />
    </>
  );
};

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  z-index: 100;
  max-width: ${({ theme }) => theme.maxWidth};
  min-width: 32rem;
  width: 100%;
`;

const MainWrapper = styled.main`
  padding: 5.2rem 0 5.8rem;

  min-width: 32rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
`;
