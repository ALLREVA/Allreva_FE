import styled from '@emotion/styled';
import { PiMapPinFill } from 'react-icons/pi';
import { TbArmchair, TbCheck } from 'react-icons/tb';

import type { ConcertHalls } from '../type';

import { BodyMediumText, CaptionText } from 'styles/Typography';

interface ConcertHallItemProps {
  concertHall: ConcertHalls;
}

const CONVENIENCE_ORDER = [
  'hasParkingLot',
  'hasRestaurant',
  'hasCafe',
  'hasStore',
  'hasDisabledParking',
  'hasDisabledToilet',
  'hasElevator',
  'hasRunway',
] as const;

const CONVENIENCE_MAP = {
  hasParkingLot: '주차시설',
  hasRestaurant: '식당',
  hasCafe: '카페',
  hasStore: '매장',
  hasDisabledParking: '장애인 전용 주차시설',
  hasDisabledToilet: '장애인 전용 화장실',
  hasElevator: '엘리베이터',
  hasRunway: '런웨이',
} as const;

const ConcertHallItem = ({ concertHall }: ConcertHallItemProps) => {
  const conveniences = CONVENIENCE_ORDER.filter((key) => concertHall.convenienceInfo[key])
    .map((key) => CONVENIENCE_MAP[key])
    .join(' | ');

  return (
    <Container key={concertHall.id}>
      <BodyMediumText className="hallName">{concertHall.name}</BodyMediumText>
      <Address>
        <PiMapPinFill size={18} />
        <CaptionText>{concertHall.address}</CaptionText>
      </Address>
      <DetailInfo>
        <SeatScale>
          <TbArmchair size={18} />
          <CaptionText>{concertHall.seatScale.toLocaleString()}석</CaptionText>
        </SeatScale>
        <Facilities>
          <TbCheck size={18} />
          <CaptionText>{conveniences}</CaptionText>
        </Facilities>
      </DetailInfo>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.6rem;
  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.colors.dark[700]};

  .hallName {
    color: ${({ theme }) => theme.colors.dark[100]};
  }

  span {
    color: ${({ theme }) => theme.colors.dark[200]};
  }

  svg {
    color: ${({ theme }) => theme.colors.dark[200]};
  }
`;

const Address = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const SeatScale = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-shrink: 0;
`;

const Facilities = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const DetailInfo = styled.div`
  display: flex;
  gap: 1.6rem;

  svg {
    flex-shrink: 0;
  }
`;

export default ConcertHallItem;
