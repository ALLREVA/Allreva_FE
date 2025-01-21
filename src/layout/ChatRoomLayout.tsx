import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

import ChatRoomHeader from 'pages/chatRoom/components/ChatRoomHeader';

export const ChatRoomLayout = () => {
  return (
    <>
      <ChatRoomHeader />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </>
  );
};

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 5.2rem;
`;
