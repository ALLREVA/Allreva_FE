import styled from '@emotion/styled';
import { Fragment, useState } from 'react';
import { BiBus, BiCoffeeTogo } from 'react-icons/bi';
import { IoRestaurantOutline } from 'react-icons/io5';
import { MdOutlineStoreMallDirectory } from 'react-icons/md';
import { TbDisabled } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';

import ConcertHallMap from './components/ConcertHallMap';
import RelatedConcert from './components/RelatedConcert';
import SeatReview from './components/SeatReview';

import { FetchErrorBoundary } from 'components/boundary';
import BaseButton from 'components/buttons/BaseButton';
import Rating from 'components/rating/Rating';
import TabBar from 'components/tabBar/TabBar';
import type { TabType } from 'components/tabBar/tabData';
import { tabMap } from 'components/tabBar/tabData';
import { useGetConcertHallDetail } from 'queries/concertHall';
import { useAuthStore } from 'stores';
import { BodyRegularText, TitleText1, TitleText2 } from 'styles/Typography';
import type { ConvenienceInfo } from 'types';

interface ActiveStyle {
  isActive?: boolean;
}

const DetailContainer = styled.div``;

const ContentContainer = styled.div`
  padding: 2.4rem;
`;

const HallName = styled(TitleText1)`
  margin-bottom: 0.8rem;
`;

const HallAddress = styled(BodyRegularText)`
  margin-bottom: 1.6rem;
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: ${({ theme }) => theme.typography.bodyM.size};

  &:nth-of-type(1) {
    margin-bottom: 0.8rem;
  }

  &:nth-of-type(2) {
    margin-bottom: 2.4rem;
  }
`;

const InfoLabel = styled(BodyRegularText)`
  min-width: 6.4rem;
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const NearbyFacilities = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const FacilitiesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;

  & > *:nth-last-of-type(1) {
    grid-column: span 2;
  }
`;

const FacilitiesInfo = styled.div<ActiveStyle>`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.dark[100] : theme.colors.dark[500])};
  font-size: ${({ theme }) => theme.typography.bodyR.size};
`;

const DisabledFacilities = styled(BodyRegularText)<ActiveStyle>`
  flex-shrink: 0;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.dark[100] : theme.colors.dark[500])};
`;

const DisabledIcon = styled(TbDisabled, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<ActiveStyle>`
  color: ${({ theme, isActive }) => (isActive ? theme.colors.dark[100] : theme.colors.dark[500])};
`;

const TabContent = styled.div`
  width: 100%;
  padding: 1.6rem 0 2.4rem 0;
`;

const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  padding: 2.4rem;
  background-color: ${({ theme }) => theme.colors.black};
`;

const FACILITIES = (convenienceInfo: ConvenienceInfo) => [
  { label: '주차 시설', icon: <BiBus size={24} />, isActive: convenienceInfo.hasParkingLot },
  {
    label: '레스토랑',
    icon: <IoRestaurantOutline size={24} />,
    isActive: convenienceInfo.hasRestaurant,
  },
  { label: '카페', icon: <BiCoffeeTogo size={24} />, isActive: convenienceInfo.hasCafe },
  {
    label: '편의점',
    icon: <MdOutlineStoreMallDirectory size={24} />,
    isActive: convenienceInfo.hasStore,
  },
];

const DISABLED_FACILITIES = (convenienceInfo: ConvenienceInfo) => [
  { label: '주차장', isActive: convenienceInfo.hasDisabledParking },
  { label: '화장실', isActive: convenienceInfo.hasDisabledToilet },
  { label: '경사로', isActive: convenienceInfo.hasElevator },
  { label: '엘리베이터', isActive: convenienceInfo.hasRunway },
];

const ConcertHallDetail = () => {
  return (
    <DetailContainer>
      <FetchErrorBoundary>
        <ConcertHallDetailContent />
      </FetchErrorBoundary>
    </DetailContainer>
  );
};

const ConcertHallDetailContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoggedIn } = useAuthStore(['isLoggedIn']);
  const { data } = useGetConcertHallDetail(id as string);
  const [activeTab, setActiveTab] = useState<(typeof tabMap)[TabType][number]>('좌석 리뷰');

  if (!data) return;

  const { name, seatScale, star, convenienceInfo, location } = data;
  const facilities = FACILITIES(convenienceInfo);
  const disabledFacilities = DISABLED_FACILITIES(convenienceInfo);
  const isActiveDisabledIcon =
    convenienceInfo.hasDisabledParking ||
    convenienceInfo.hasDisabledToilet ||
    convenienceInfo.hasRunway ||
    convenienceInfo.hasElevator;

  const handleActiveTab = (tab: (typeof tabMap)[TabType][number]) => {
    setActiveTab(tab);
  };

  const reviewClickHandler = () => {
    if (!isLoggedIn) navigate('/signin');
    else navigate(`/concert-halls/${id}/seat-review/create`);
  };

  return (
    <>
      <ConcertHallMap latitude={location.latitude} longitude={location.longitude} />
      <ContentContainer>
        <HallName>{name}</HallName>
        <HallAddress>{location.address}</HallAddress>
        <InfoWrapper>
          <InfoLabel>좌석 수</InfoLabel>
          {seatScale.toLocaleString()}석
        </InfoWrapper>
        <InfoWrapper>
          <InfoLabel>리뷰 평점</InfoLabel>
          <Rating score={star} /> {`(${star})`}
        </InfoWrapper>
        <NearbyFacilities>
          <TitleText2>공연 주변 시설</TitleText2>
          <FacilitiesWrapper>
            {facilities.map((item) => (
              <FacilitiesInfo isActive={item.isActive} key={item.label}>
                {item.icon} {item.label}
              </FacilitiesInfo>
            ))}
            <FacilitiesInfo key="장애 시설">
              <DisabledIcon isActive={isActiveDisabledIcon} size={24} />
              {disabledFacilities.map((item, idx) => (
                <Fragment key={item.label}>
                  <DisabledFacilities isActive={item.isActive}>{item.label}</DisabledFacilities>
                  {idx < disabledFacilities.length - 1 && <span> | </span>}
                </Fragment>
              ))}
            </FacilitiesInfo>
          </FacilitiesWrapper>
        </NearbyFacilities>
      </ContentContainer>
      <TabBar onTabClick={handleActiveTab} selectedTab={activeTab} tabList={tabMap['concertTab']} />
      <TabContent>
        {activeTab === '좌석 리뷰' && <SeatReview />}
        {activeTab === '관련 공연' && <RelatedConcert hallCode={id as string} />}
      </TabContent>
      <BottomButtonWrapper>
        <BaseButton color="primary" onClick={reviewClickHandler} size="medium" variant="fill">
          {isLoggedIn ? '리뷰 작성' : '로그인 후 리뷰 작성'}
        </BaseButton>
      </BottomButtonWrapper>
    </>
  );
};

export default ConcertHallDetail;
