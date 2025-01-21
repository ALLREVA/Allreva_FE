import styled from '@emotion/styled';

import { CaptionText, SmallText } from 'styles/Typography';

interface MyChatProps {
  content: string;
  time: string;
}

const MyChatContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

const ChatContent = styled.div``;

const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.8rem;
`;

const SpeechBubble = styled.div`
  width: fit-content;
  max-width: 23.2rem;
  padding: 0.8rem 1.2rem;
  border-radius: 12px 4px 12px 12px;
  background-color: ${({ theme }) => theme.colors.dark[700]};
`;

const ChatDetail = styled.div``;

// const UnreadCount = styled(SmallText)`
//   display: block;
//   color: ${({ theme }) => theme.colors.primary};
// `;

const ChatTime = styled(SmallText)`
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const MyChat = ({ content, time }: MyChatProps) => {
  return (
    <MyChatContainer>
      <ChatContent>
        <MessageWrapper>
          <ChatDetail>
            {/* <UnreadCount>2</UnreadCount> */}
            <ChatTime>{time}</ChatTime>
          </ChatDetail>
          <SpeechBubble>
            <CaptionText>{content}</CaptionText>
          </SpeechBubble>
        </MessageWrapper>
      </ChatContent>
    </MyChatContainer>
  );
};

export default MyChat;
