import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { LuCalendar } from 'react-icons/lu';

import ListItem from './components/ListItem';
import type { Result } from './type';

import { getConcertList } from 'api/concerts';
import FilterChip from 'components/chips/FilterChip';
import { useModalStore } from 'stores';
import { BodyRegularText, ChipText, HeaderText, SmallText } from 'styles/Typography';

const PAGE_SIZE = 7;
const SORT_DIRECTION = 'DATE';

const Concert = () => {
  const { openModal } = useModalStore(['openModal']);
  const [selectedRegion, setSelectedRegion] = useState('전체');

  const { data, refetch } = useQuery<Result>({
    queryKey: ['concerts', selectedRegion, SORT_DIRECTION, PAGE_SIZE],
    queryFn: async () => {
      const {
        data: { result },
      } = await getConcertList(selectedRegion, SORT_DIRECTION, PAGE_SIZE);
      return result;
    },
  });

  const handleRegionSelect = async (region: string) => {
    setSelectedRegion(region);
    try {
      await refetch();
    } catch (e) {
      console.error(e);
    }
  };

  const handleRegionClick = () => {
    openModal('bottomSheet', 'list', <ListItem onRegionSelect={handleRegionSelect} />);
  };

  return (
    <ConcertContainer>
      <ExpectedConcert>
        <HeaderText>예정 공연</HeaderText>
        <BodyRegularText>ALLREVA에서 예정된 공연들을 손쉽게 확인해보세요!</BodyRegularText>
      </ExpectedConcert>
      <Filter>
        <FilterChip isActive={false} onClick={handleRegionClick}>
          {selectedRegion}
        </FilterChip>
        <FilterChip isActive={false}>최근 공연순</FilterChip>
      </Filter>
      <ConcertList>
        {data?.concertThumbnails.map((concert) => (
          <ConcertItem>
            <img alt="posterImg" key={concert.id} src={concert.poster} />
            <Content>
              <ChipText>{concert.title}</ChipText>
              <ConcertInfo>
                <SmallText>{concert.concertHallName}</SmallText>
                <Place>
                  <LuCalendar size={16} />
                  <SmallText>
                    {concert.stdate} - {concert.eddate}
                  </SmallText>
                </Place>
              </ConcertInfo>
            </Content>
          </ConcertItem>
        ))}
      </ConcertList>
    </ConcertContainer>
  );
};

const ConcertContainer = styled.div``;

const ExpectedConcert = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 3.3rem 2.4rem;
  width: 100%;
  height: 16rem;
  background-color: ${({ theme }) => theme.colors.dark[100]};

  h2 {
    color: ${({ theme }) => theme.colors.dark[700]};
  }

  p {
    color: ${({ theme }) => theme.colors.dark[500]};
  }
`;

const Filter = styled.div`
  display: flex;
  gap: 12px;
  padding: 2.4rem 2.4rem 0 2.4rem;
`;

const ConcertList = styled.div`
  width: 100%;
  padding: 2.4rem;
`;

const ConcertItem = styled.div`
  display: flex;
  gap: 1.6rem;
  padding: 1.2rem 0;

  img {
    width: 7.5rem;
    height: 10rem;

    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  & > span:first-child {
    color: ${({ theme }) => theme.colors.dark[100]};
  }
`;

const Place = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const ConcertInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.dark[200]};
`;

export default Concert;
