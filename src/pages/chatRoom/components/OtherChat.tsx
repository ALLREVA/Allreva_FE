import styled from '@emotion/styled';

import { CaptionText, SmallText } from 'styles/Typography';
import type { MessageType } from 'types';

interface OtherChatProps {
  profileImg: string;
  nickname: string;
  content: string;
  time: string;
  contentType: MessageType;
}

const OtherChatContainer = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const ProfileImgWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

const ProfileImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ChatContent = styled.div``;

const Nickname = styled(SmallText)`
  display: block;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.dark[100]};
`;

const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.8rem;
`;

const SpeechBubble = styled.div`
  width: fit-content;
  max-width: 23.2rem;
  padding: 0.8rem 1.2rem;
  border-radius: 4px 12px 12px 12px;
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

const OtherChat = ({ profileImg, nickname, content, time, contentType }: OtherChatProps) => {
  return (
    <OtherChatContainer>
      <ProfileImgWrapper>
        <ProfileImage alt={profileImg} src={profileImg} />
      </ProfileImgWrapper>
      <ChatContent>
        <Nickname>{nickname}</Nickname>
        <MessageWrapper>
          {contentType === 'TEXT' && (
            <SpeechBubble>
              <CaptionText>{content}</CaptionText>
            </SpeechBubble>
          )}
          {contentType === 'IMAGE' && <Image alt={content} src={content} />}
          <ChatDetail>
            {/* <UnreadCount>2</UnreadCount> */}
            <ChatTime>{time}</ChatTime>
          </ChatDetail>
        </MessageWrapper>
      </ChatContent>
    </OtherChatContainer>
  );
};

export default OtherChat;
