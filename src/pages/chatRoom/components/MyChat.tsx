import styled from '@emotion/styled';

import { CaptionText, SmallText } from 'styles/Typography';
import type { MessageType } from 'types';

interface MyChatProps {
  content: string;
  time: string;
  contentType: MessageType;
}

const MyChatContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  padding-top: 0.8rem;
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

const Image = styled.img`
  width: 100%;
  max-width: 23.2rem;
  border-radius: 8px;
`;

const ChatDetail = styled.div``;

// const UnreadCount = styled(SmallText)`
//   display: block;
//   color: ${({ theme }) => theme.colors.primary};
// `;

const ChatTime = styled(SmallText)`
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const MyChat = ({ content, time, contentType }: MyChatProps) => {
  return (
    <MyChatContainer>
      <ChatContent>
        <MessageWrapper>
          <ChatDetail>
            {/* <UnreadCount>2</UnreadCount> */}
            <ChatTime>{time}</ChatTime>
          </ChatDetail>
          {contentType === 'TEXT' && (
            <SpeechBubble>
              <CaptionText>{content}</CaptionText>
            </SpeechBubble>
          )}
          {contentType === 'IMAGE' && <Image alt={content} src={content} />}
        </MessageWrapper>
      </ChatContent>
    </MyChatContainer>
  );
};

export default MyChat;
