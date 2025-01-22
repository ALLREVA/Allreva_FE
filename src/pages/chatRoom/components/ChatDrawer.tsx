import styled from '@emotion/styled';
import { LuAlertCircle } from 'react-icons/lu';
import { PiSignOutBold } from 'react-icons/pi';
import { TbChevronLeft, TbSettings } from 'react-icons/tb';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import ExitDialog from './ExitDialog';
import MemberList from './MemberList';

import { TOAST_MESSAGES } from 'constants/toastMessage';
import { useModalStore, useToastStore } from 'stores';
import { BodyMediumText, CaptionText } from 'styles/Typography';

interface ChatDrawerProps {
  toggleDrawer: () => void;
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
  padding: 1.6rem 2.4rem 2.4rem 2.4rem;

  overflow-x: scroll;
  /* overflow-y: hidden; */

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

const dummyData = {
  thumbnail: {
    url: 'https://api.nudge-community.com/attachments/7728799',
  },
  title: '성진',
  description: '데이식스 FOREVER YOUNG 천안 차대절 단체 채팅방 입니다!',
  me: {
    memberId: 1,
    nickname: '짱구',
    profileImage: {
      url: 'https://mblogthumb-phinf.pstatic.net/MjAyMDEyMTRfMjkx/MDAxNjA3ODczNTIyMTY1.SWSlQJjMYvMZE3PcvMVkd2GLEECywGS9zi3Ps9eoh8sg.z9Gmy-mCezPiSkK0lTbzSaHSinbl5B4sBcT0o5W9ZnAg.JPEG.sosohan_n/24_(2).jpg?type=w800',
    },
  },
  manager: {
    memberId: 1,
    nickname: '짱구',
    profileImage: {
      url: 'https://mblogthumb-phinf.pstatic.net/MjAyMDEyMTRfMjkx/MDAxNjA3ODczNTIyMTY1.SWSlQJjMYvMZE3PcvMVkd2GLEECywGS9zi3Ps9eoh8sg.z9Gmy-mCezPiSkK0lTbzSaHSinbl5B4sBcT0o5W9ZnAg.JPEG.sosohan_n/24_(2).jpg?type=w800',
    },
  },
  participants: [
    {
      memberId: 1,
      nickname: '짱구',
      profileImage: {
        url: 'https://mblogthumb-phinf.pstatic.net/MjAyMDEyMTRfMjkx/MDAxNjA3ODczNTIyMTY1.SWSlQJjMYvMZE3PcvMVkd2GLEECywGS9zi3Ps9eoh8sg.z9Gmy-mCezPiSkK0lTbzSaHSinbl5B4sBcT0o5W9ZnAg.JPEG.sosohan_n/24_(2).jpg?type=w800',
      },
    },
    {
      memberId: 2,
      nickname: '성진',
      profileImage: {
        url: 'https://api.nudge-community.com/attachments/7728799',
      },
    },
  ],
};

const ChatDrawer = ({ toggleDrawer }: ChatDrawerProps) => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { openModal } = useModalStore(['openModal']);
  const { addToast } = useToastStore(['addToast']);

  const { thumbnail, title, description, me, manager, participants } = dummyData;

  const isGroupChat = pathname.startsWith('/chat/group/');

  const handleSettingClick = () => {
    navigate(`/chat/group/${id}/edit`, { state: { thumbnail, title, description } });
  };

  const handleExitClick = () => {
    if (me.memberId === manager.memberId && participants.length > 1 && isGroupChat) {
      addToast(
        TOAST_MESSAGES.PREVENT_EXIT_CHAT,
        <LuAlertCircle size={16} style={{ flexShrink: 0, color: '#FF595E' }} />
      );
    } else {
      openModal('dialog', 'confirm', <ExitDialog />);
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
        <MemberList manager={manager} me={me} participants={participants} />
      </ContentContainer>
      <DrawerBottomContainer isManager={me.memberId === manager.memberId && isGroupChat}>
        {isGroupChat && me.memberId === manager.memberId && (
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
