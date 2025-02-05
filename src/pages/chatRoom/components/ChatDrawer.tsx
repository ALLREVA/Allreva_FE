import styled from '@emotion/styled';
import { LuAlertCircle } from 'react-icons/lu';
import { PiSignOutBold } from 'react-icons/pi';
import { TbChevronLeft, TbSettings } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';

import ExitDialog from './ExitDialog';
import MemberList from './MemberList';

import { TOAST_MESSAGES } from 'constants/toastMessage';
import { useGetChatInfo } from 'queries/chat';
import { useModalStore, useToastStore } from 'stores';
import { BodyMediumText, CaptionText } from 'styles/Typography';
import type { ChatType } from 'types';

interface ChatDrawerProps {
  toggleDrawer: () => void;
  chatType: ChatType;
}

const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 1000;
  transform: translateX(-50%);
  width: 100%;
  max-width: 43rem;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.black};
`;

const DrawerTop = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 5.2rem;
  padding: 0 1.6rem;
`;

const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.dark[200]};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 1.6rem;
  overflow-x: scroll;
  padding: 1.6rem 2.4rem 2.4rem 2.4rem;

  &::-webkit-scrollbar {
    width: 6px;
    height: 0;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.dark[500]};
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.black};
  }

  @media (max-width: 768px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ThumbnailContainer = styled.div`
  flex-shrink: 0;
  position: relative;
  width: 9.6rem;
  height: 9.6rem;
  overflow: hidden;
  border-radius: 16px;
`;

const ThumbnailImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Description = styled.div`
  flex-shrink: 0;
  height: 6.8rem;
  padding: 0 4rem;
`;

const DrawerBottomContainer = styled.div<{ isManager: boolean }>`
  display: flex;
  justify-content: ${({ isManager }) => (isManager ? 'space-between' : 'flex-end')};
  align-items: center;
  flex-shrink: 0;
  gap: 1.2rem;
  height: 6.4rem;
  padding: 0 2.4rem;
  background-color: ${({ theme }) => theme.colors.dark[800]};
`;

const ActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.dark[200]};
  }
`;

const ChatDrawer = ({ toggleDrawer, chatType }: ChatDrawerProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModalStore(['openModal']);
  const { addToast } = useToastStore(['addToast']);

  const { data: chatInfo } = useGetChatInfo(parseInt(id as string), chatType);

  if (!chatInfo) return;

  const { thumbnail, title, description, me, manager, participants, otherMember } = chatInfo;
  const isGroupChat = chatType === 'GROUP';

  const handleSettingClick = () => {
    navigate(`/chat/group/${id}/edit`, { state: { thumbnail: thumbnail.url, title, description } });
  };

  const handleExitClick = () => {
    if (
      participants &&
      me.memberId === manager?.memberId &&
      participants.length > 1 &&
      isGroupChat
    ) {
      addToast(
        TOAST_MESSAGES.PREVENT_EXIT_CHAT,
        <LuAlertCircle size={16} style={{ flexShrink: 0, color: '#FF595E' }} />
      );
    } else {
      openModal(
        'dialog',
        'confirm',
        <ExitDialog
          chatId={parseInt(id as string)}
          chatType={chatType}
          isManager={me.memberId === manager?.memberId}
        />
      );
    }
  };

  return (
    <DrawerContainer>
      <DrawerTop>
        <CloseButton onClick={toggleDrawer}>
          <TbChevronLeft size={24} />
        </CloseButton>
      </DrawerTop>
      <ContentContainer>
        <ThumbnailContainer>
          <ThumbnailImg alt={title} src={thumbnail.url} />
        </ThumbnailContainer>
        <BodyMediumText>{title}</BodyMediumText>
        <Description>
          <CaptionText>{description}</CaptionText>
        </Description>
        <MemberList
          isGroupChat={isGroupChat}
          manager={manager}
          me={me}
          otherMember={otherMember}
          participants={participants}
        />
      </ContentContainer>
      <DrawerBottomContainer
        isManager={(manager && me.memberId === manager.memberId && isGroupChat) || false}
      >
        {isGroupChat && me.memberId === manager?.memberId && (
          <ActionButton onClick={handleSettingClick}>
            <TbSettings size={24} />
          </ActionButton>
        )}
        <ActionButton onClick={handleExitClick}>
          <PiSignOutBold size={24} />
        </ActionButton>
      </DrawerBottomContainer>
    </DrawerContainer>
  );
};

export default ChatDrawer;
