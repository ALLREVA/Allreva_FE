import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import type { UIMatch } from 'react-router-dom';
import { Outlet, useMatches, useParams } from 'react-router-dom';

import ChatDrawer from 'pages/chatRoom/components/ChatDrawer';
import ChatRoomHeader from 'pages/chatRoom/components/ChatRoomHeader';
import type { ChatType } from 'types';

interface RouteHandle {
  chatType: ChatType;
}

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
  const { id = '' } = useParams();
  const matches = useMatches() as Array<UIMatch<unknown, RouteHandle>>;
  const activeRoute = matches[matches.length - 1];
  const { chatType } = activeRoute.handle;

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    setDrawerOpen(false);
  }, [id]);

  return (
    <LayoutContainer>
      <ChatRoomHeader onMoreClick={toggleDrawer} />
      {drawerOpen && <ChatDrawer chatType={chatType} toggleDrawer={toggleDrawer} />}
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </LayoutContainer>
  );
};
