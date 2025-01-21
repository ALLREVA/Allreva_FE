import styled from '@emotion/styled';

import ChatInput from './components/ChatInput';
import MyChat from './components/MyChat';
import OtherChat from './components/OtherChat';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1.6rem;
  padding: 1.6rem 2.4rem 2.4rem 2.4rem;
`;

const PrivateChatRoom = () => {
  return (
    <ContentContainer>
      <ChatContent>
        <OtherChat
          content="안녕하세요"
          nickname="성진"
          profileImg="https://api.nudge-community.com/attachments/7728799"
          time="16:09"
        />
        <MyChat content="긴 메시지 내용입니다. 긴 메시지 내용입니다." time="16:12" />
      </ChatContent>
      <ChatInput />
    </ContentContainer>
  );
};

export default PrivateChatRoom;
