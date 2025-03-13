import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

import BottomNav from 'components/bottomNav/BottomNav';
import Header from 'components/header/Header';
import TopNav from 'components/topNav/TopNav';

export const FullLayout = () => {
  return (
    <>
      <HeaderWrapper>
        <Header />
        <TopNav />
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
  display: flex;
  flex-direction: column;
  padding-top: calc(5.2rem * 2);
  padding-bottom: 5.8rem;
  min-width: 32rem;
  min-height: 100vh;
  height: 100%;
`;
