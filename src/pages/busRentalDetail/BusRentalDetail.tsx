import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import BusTime from './components/sections/BusTime';
import DepositAccount from './components/sections/DepositAccount';
import DrivingInfo from './components/sections/DrivingInfo';
import ParticipantsStatus from './components/sections/ParticipantsStatus';
import DepositFormSheet from './components/sheets/DepositFormSheet';

import Badge from 'components/badge/Badge';
import { FetchErrorBoundary } from 'components/boundary';
import BaseButton from 'components/buttons/BaseButton';
import SimpleChip from 'components/chips/SimpleChip';
import { useGetRentalDetails } from 'queries/rent';
import { useAuthStore, useModalStore } from 'stores';
import { BodyRegularText, TitleText1, TitleText2 } from 'styles/Typography';
import { formatDateWithDay, getDday } from 'utils';

const DetailContainer = styled.div`
  position: relative;
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

const ContentContainer = styled.div`
  padding: 2.4rem;
`;

const Title = styled(TitleText1)`
  margin: 1.6rem 0 0.8rem 0;
`;

const ConcertName = styled(BodyRegularText)`
  margin-bottom: 1.6rem;
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const ChipWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.6rem;
`;

const SectionWrapper = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 3.2rem;
  }
`;

const SectionTitle = styled(TitleText2)`
  margin-bottom: 1.6rem;
  color: ${({ theme }) => theme.colors.dark[50]};
`;

const Information = styled(BodyRegularText)`
  color: ${({ theme }) => theme.colors.dark[200]};
  white-space: pre-line;
`;

const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  padding: 2.4rem;
  background-color: ${({ theme }) => theme.colors.black};
`;

const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <SectionWrapper>
    <SectionTitle>{title}</SectionTitle>
    {children}
  </SectionWrapper>
);

const BusRentalDetail = () => {
  return (
    <DetailContainer>
      <FetchErrorBoundary>
        <BusRentalDetailContent />
      </FetchErrorBoundary>
    </DetailContainer>
  );
};

const BusRentalDetailContent = () => {
  const { id } = useParams();
  const { openModal } = useModalStore(['openModal']);
  const { isLoggedIn } = useAuthStore(['isLoggedIn']);
  const { data: details } = useGetRentalDetails(id as string);

  if (!details) return <div>세부 정보가 존재하지 않습니다.</div>;

  const {
    imageUrl,
    title,
    concertName,
    region,
    artistName,
    endDate,
    boardingDates,
    recruitmentCount,
    boardingArea,
    dropOffArea,
    busSize,
    busType,
    maxPassenger,
    roundPrice,
    upTimePrice,
    downTimePrice,
    depositAccount,
    upTime,
    downTime,
    information,
    refundType,
    closed,
    refundAccount,
  } = details;

  const dDay = getDday(endDate);
  const rentDates = boardingDates.map((item) => formatDateWithDay(item.date));
  const busPrices = [roundPrice, upTimePrice, downTimePrice];

  const handleDepositFormClick = () => {
    openModal(
      'bottomSheet',
      'list',
      <DepositFormSheet
        boardingDates={boardingDates}
        refundAccount={refundAccount}
        refundOption={refundType}
      />
    );
  };

  return (
    <>
      <ThumbnailContainer>
        <ThumbnailImg alt={title} src={imageUrl} />
      </ThumbnailContainer>
      <ContentContainer>
        <SectionWrapper>
          <Badge color={dDay > 3 ? 'gray' : 'red'} size="medium" variant="square">
            {dDay === 0 ? `D-Day` : `D-${dDay}`}
          </Badge>
          <Title>{title}</Title>
          <ConcertName>{concertName}</ConcertName>
          <ChipWrapper>
            <SimpleChip>{region}</SimpleChip>
            <SimpleChip>{artistName}</SimpleChip>
          </ChipWrapper>
          <ParticipantsStatus boardingDates={boardingDates} recruitmentCount={recruitmentCount} />
        </SectionWrapper>
        <InfoSection title="운행 정보">
          <DrivingInfo
            boardingArea={boardingArea}
            busPrices={busPrices}
            busSize={busSize}
            busType={busType}
            maxPassenger={maxPassenger}
            rentDates={rentDates}
          />
        </InfoSection>
        <InfoSection title="입금 계좌">
          <DepositAccount depositAccount={depositAccount} />
        </InfoSection>
        <InfoSection title="출발 시각">
          <BusTime
            boardingArea={boardingArea}
            downTime={downTime}
            dropOffArea={dropOffArea}
            upTime={upTime}
          />
        </InfoSection>
        <InfoSection title="기타 안내 사항">
          <Information>{information}</Information>
        </InfoSection>
      </ContentContainer>
      <BottomButtonWrapper>
        <BaseButton
          color="primary"
          isDisabled={closed || !isLoggedIn}
          onClick={handleDepositFormClick}
          size="medium"
          variant="fill"
        >
          {closed ? '신청 마감' : !isLoggedIn ? '로그인 후 신청 가능' : '폼 작성하기'}
        </BaseButton>
      </BottomButtonWrapper>
    </>
  );
};

export default BusRentalDetail;
