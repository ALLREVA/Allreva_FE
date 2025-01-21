import styled from '@emotion/styled';
import { TbChevronLeft, TbDotsVertical, TbShare2 } from 'react-icons/tb';
import { useLocation, useNavigate } from 'react-router-dom';

import { BodyMediumText, CaptionText } from 'styles/Typography';

const ChatHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 5.6rem 1fr 5.6rem;
  align-items: center;
  gap: 0.8rem;
  position: fixed;
  z-index: 900;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  height: 5.2rem;
  padding: 0 1.6rem;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  white-space: nowrap;
  user-select: none;
`;

const ActionButton = styled.button`
  justify-self: flex-start;
  width: 2.4rem;
  height: 2.4rem;
  color: ${({ theme }) => theme.colors.white};

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.dark[200]};
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  overflow: hidden;
  width: 100%;
`;

const Title = styled(BodyMediumText)`
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Members = styled(CaptionText)`
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const ActionButtonWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 0.8rem;
`;

const ChatRoomHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, members } = location.state || {};

  return (
    <ChatHeaderContainer>
      <ActionButton onClick={() => navigate(-1)}>
        <TbChevronLeft size={24} />
      </ActionButton>
      <TitleWrapper>
        <Title>{title}</Title>
        {members && <Members>{members}</Members>}
      </TitleWrapper>
      <ActionButtonWrapper>
        <ActionButton>
          <TbShare2 size={24} />
        </ActionButton>
        <ActionButton>
          <TbDotsVertical size={24} />
        </ActionButton>
      </ActionButtonWrapper>
    </ChatHeaderContainer>
  );
};

export default ChatRoomHeader;
