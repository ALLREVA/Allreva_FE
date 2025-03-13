import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { PiPencilSimpleLineBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

import ConcertItem from './components/ConcertItem';
import FilterChips from './components/FilterChips';
import ListItem from './components/ListItem';
import type { FilterCategory, Result } from './type';

import { getConcertList } from 'api/concerts';
import IconButton from 'components/buttons/IconButton';
import { endPoint } from 'constants/endPoint';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import { useModalStore } from 'stores';
import { BodyRegularText, HeaderText } from 'styles/Typography';

type Param = [number, string] | null;
const Concert = () => {
  const { openModal } = useModalStore(['openModal']);
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedDirection, setSelectedDirection] = useState('DATE');
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<Result>({
    queryKey: ['concerts', selectedRegion, selectedDirection],
    queryFn: async ({ pageParam }) => {
      const {
        data: { result },
      } = await getConcertList(selectedRegion, selectedDirection, pageParam as Param);
      return result;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.searchAfter || undefined;
    },
  });

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
  };

  const handleDirectionSelect = (sortDirection: string) => {
    setSelectedDirection(sortDirection);
  };

  const handleModalOpen = (title: FilterCategory, onSelect: (value: string) => void) => {
    openModal('bottomSheet', 'list', <ListItem onSelect={onSelect} title={title} />);
  };

  const handleObserver = () => {
    if (hasNextPage && !isFetchingNextPage) {
      if (hasNextPage) {
        void fetchNextPage();
      }
    }
  };

  const targetRef = useIntersectionObserver(handleObserver);

  return (
    <ConcertContainer>
      <ExpectedConcert>
        <HeaderText>예정 공연</HeaderText>
        <BodyRegularText>ALLREVA에서 예정된 공연들을 손쉽게 확인해보세요!</BodyRegularText>
      </ExpectedConcert>
      <FilterChips
        handleDirectionSelect={handleDirectionSelect}
        handleModalOpen={handleModalOpen}
        handleRegionSelect={handleRegionSelect}
        selectedDirection={selectedDirection}
        selectedRegion={selectedRegion}
      />
      <ConcertList>
        {data?.pages.map((page) =>
          page.concertThumbnails.map((concert) => (
            <ConcertItem
              concert={concert}
              key={concert.id}
              onClick={() => navigate(endPoint.GET_CONCERT_DETAIL(concert.id))}
            />
          ))
        )}
      </ConcertList>
      <div ref={targetRef} />
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

const ConcertList = styled.div`
  width: 100%;
  padding: 2.4rem;
`;

export default Concert;
