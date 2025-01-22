import styled from '@emotion/styled';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import ChatDrawer from 'pages/chatRoom/components/ChatDrawer';
import ChatRoomHeader from 'pages/chatRoom/components/ChatRoomHeader';

const LayoutContainer = styled.div`
  position: relative;
`;

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 5.2rem;
`;

export const ChatRoomLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <LayoutContainer>
      <ChatRoomHeader onMoreClick={toggleDrawer} />
      {drawerOpen && <ChatDrawer toggleDrawer={toggleDrawer} />}
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </LayoutContainer>
  );
};
