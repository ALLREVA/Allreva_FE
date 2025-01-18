import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

import ConcertHallItem from './components/ConcertHallItem';
import FilterChips from './components/FilterChips';
import ListItem from './components/ListItem';
import type { FiltersActive, Result } from './type';

import { getConcertHallsList } from 'api/concertHalls';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import { useModalStore } from 'stores';
import { BodyRegularText, HeaderText } from 'styles/Typography';

type Param = [string, string, string] | null;
const ConcertHallsList = () => {
  const { openModal } = useModalStore(['openModal']);
  const [selectedAddress, setSelectedAddress] = useState('전체');
  const [selectedSeatScale, setSelectedSeatScale] = useState<number | null>(null);
  const [filtersActive, setFiltersActive] = useState<FiltersActive>({
    addressFilter: false,
    seatScaleFilter: false,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<Result>({
    queryKey: ['concerts', selectedAddress, selectedSeatScale],
    queryFn: async ({ pageParam }) => {
      const {
        data: { result },
      } = await getConcertHallsList(selectedAddress, selectedSeatScale, pageParam as Param);
      return result;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.searchAfter || undefined;
    },
  });

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
  };

  const handleSeatScaleSelect = (seatScale: number) => {
    setSelectedSeatScale(seatScale);
  };

  const handleModalOpen = <T extends string | number>(
    title: string,
    onSelect: (value: T) => void
  ) => {
    openModal(
      'bottomSheet',
      'list',
      <ListItem onSelect={onSelect} setFiltersActive={setFiltersActive} title={title} />
    );
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
    <>
      <BannerContainer>
        <HeaderText>공연장 정보</HeaderText>
        <BodyRegularText>ALLREVA에서 공연장 정보들을 확인하세요!</BodyRegularText>
      </BannerContainer>
      <ContentContainer>
        <FilterChips
          filtersActive={filtersActive}
          handleAddressSelect={handleAddressSelect}
          handleModalOpen={handleModalOpen}
          handleSeatScaleSelect={handleSeatScaleSelect}
          selectedAddress={selectedAddress}
          selectedSeatScale={selectedSeatScale}
        />
      </ContentContainer>
      <ConcertHallList>
        {data?.pages.map((page) =>
          page.concertHallThumbnails.map((concertHall) => (
            <ConcertHallItem concertHall={concertHall} key={concertHall.id} />
          ))
        )}
      </ConcertHallList>
      <div ref={targetRef} />
    </>
  );
};

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  height: 16rem;
  padding: 3.2rem 2.4rem;
  background-color: ${({ theme }) => theme.colors.dark[100]};

  h2 {
    color: ${({ theme }) => theme.colors.dark[700]};
  }
  p {
    color: ${({ theme }) => theme.colors.dark[500]};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const ConcertHallList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  padding: 0 2.4rem 2.4rem 2.4rem;
`;

export default ConcertHallsList;
