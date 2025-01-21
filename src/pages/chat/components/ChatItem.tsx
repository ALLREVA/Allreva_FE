import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { CaptionText, ChipText, SmallText } from 'styles/Typography';
import { formatCustomTime } from 'utils';

interface ChatItemProps {
  id: string;
  chatImg: string;
  title: string;
  members: number | null;
  lastTime: string;
  lastChatContent: string;
  lastChatNum: number;
  readChatNum: number;
}

const ChatItemContainer = styled.li`
  display: flex;
  align-items: stretch;
  gap: 1.2rem;
  padding: 1.6rem 2.4rem;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.colors.dark[800]};
  }
`;

const ChatImageWrapper = styled.div`
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 8px;
`;

const ChatImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ChatContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ChatContentTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const ChatTitle = styled(ChipText)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Members = styled(SmallText)`
  color: ${({ theme }) => theme.colors.primary};
`;

const LastMessage = styled(CaptionText)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const ChatDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: stretch;
  justify-content: space-around;
  flex-shrink: 0;
`;

const LastChatTime = styled(SmallText)`
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const BadgeContainer = styled.div<{ isVisible: boolean }>`
  display: flex;
  justify-content: center;
  justify-self: flex-end;
  align-items: center;
  visibility: ${({ isVisible }) => (isVisible ? 'auto' : 'hidden')};
  width: fit-content;
  height: 2.4rem;
  padding: 0 0.8rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme }) => theme.colors.white};
`;

const ChatItem = ({
  id,
  chatImg,
  title,
  members,
  lastTime,
  lastChatContent,
  lastChatNum,
  readChatNum,
}: ChatItemProps) => {
  const navigate = useNavigate();

  const chatCount = lastChatNum - readChatNum;

  const handleChatClick = () => {
    if (members) {
      navigate(`/chat/group/${id}`, { state: { title, members } });
    } else {
      navigate(`/chat/private/${id}`, { state: { title, members } });
    }
  };

  return (
    <ChatItemContainer onClick={handleChatClick}>
      <ChatImageWrapper>
        <ChatImage alt={title} src={chatImg} />
      </ChatImageWrapper>
      <ChatContent>
        <ChatContentTop>
          <ChatTitle>{title}</ChatTitle>
          <Members>{members}</Members>
        </ChatContentTop>
        <LastMessage>{lastChatContent}</LastMessage>
      </ChatContent>
      <ChatDetailInfo>
        <LastChatTime>{formatCustomTime(lastTime)}</LastChatTime>
        <BadgeContainer isVisible={chatCount > 0}>
          <SmallText>{chatCount > 99 ? `99+` : `${chatCount}`}</SmallText>
        </BadgeContainer>
      </ChatDetailInfo>
    </ChatItemContainer>
  );
};

export default ChatItem;
