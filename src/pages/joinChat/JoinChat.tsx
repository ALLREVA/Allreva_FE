import styled from '@emotion/styled';
import { BsCircleFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';

import BaseButton from 'components/buttons/BaseButton';
import { usePostGroupChat } from 'queries/chat';
import { BodyRegularText, TitleText1 } from 'styles/Typography';

interface JoinChatProps {
  chatImage: string;
  members: number;
  title: string;
  description: string;
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
  overflow: hidden;
`;

const ThumbnailImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 2.4rem;
  padding: 3.2rem 2.4rem;
`;

const ParticipationStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.dark[200]};
  font-size: ${({ theme }) => theme.typography.caption.size};
`;

const Circle = styled(BsCircleFill)`
  color: ${({ theme }) => theme.colors.primary};
`;

const Descrption = styled(BodyRegularText)`
  color: ${({ theme }) => theme.colors.dark[100]};
`;

const BottomButtonWrapper = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2.4rem;
  background-color: ${({ theme }) => theme.colors.black};
`;

const dummyData = {
  chatImg:
    'https://www.news1.kr/_next/image?url=https%3A%2F%2Fi3n.news1.kr%2Fsystem%2Fphotos%2F2024%2F3%2F15%2F6537495%2Fhigh.jpg&w=1920&q=75',
  title: '데이식스 천안 차대절 🎸',
  members: 5,
  description: '데이식스 FOREVER YOUNG 천안 차대절 단체 채팅방 입니다!',
};

const JoinChat = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { chatImg, title, members, description } = dummyData;

  const { mutate } = usePostGroupChat();

  const handleJoinChat = () => {
    if (id)
      mutate(id, {
        onSuccess: (chatId) =>
          navigate(`/chat/group/${chatId}`, { state: { title, members, chatType: 'GROUP' } }),
      });
  };

  return (
    <ContentContainer>
      <ThumbnailContainer>
        <ThumbnailImg alt="title" src={chatImg} />
      </ThumbnailContainer>
      <ContentWrapper>
        <ParticipationStatus>
          <Circle size={8} />
          {members}명 참여중
        </ParticipationStatus>
        <TitleText1>{title}</TitleText1>
        <Descrption>{description === '' ? '-' : description}</Descrption>
      </ContentWrapper>
      <BottomButtonWrapper>
        <BaseButton
          color="primary"
          isDisabled={closed}
          onClick={handleJoinChat}
          size="medium"
          variant="fill"
        >
          채팅 참여하기
        </BaseButton>
      </BottomButtonWrapper>
    </ContentContainer>
  );
};

export default JoinChat;
