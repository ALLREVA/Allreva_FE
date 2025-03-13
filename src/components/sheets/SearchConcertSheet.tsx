import styled from '@emotion/styled';
import { useMemo, useState } from 'react';

import Magnifier from 'assets/images/magnifier-icon.svg?react';
import BottomSheet from 'components/bottomSheet/BottomSheet';
import SearchConcertItem from 'components/items/SearchConcertItem';
import SearchInput from 'components/searchInput/SearchInput';
import { SEARCH_PLACEHOLDER } from 'constants/placeholder';
import { useIntersectionObserver } from 'hooks';
import { useGetSearchConcert } from 'queries/search';
import { useModalStore } from 'stores';
import { BodyRegularText } from 'styles/Typography';
import type { ConcertData } from 'types';

interface SearchConcertSheetProps {
  isPastSearch?: boolean;
  onConcertSelect?: (data: ConcertData) => void;
  filterFn?: (concert: ConcertData) => boolean;
}

const SheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const SearchResultContainer = styled.div<{ isEmpty: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ isEmpty }) => (isEmpty ? 'center' : 'flex-start')};
  align-items: ${({ isEmpty }) => (isEmpty ? 'center' : 'flex-start')};
  gap: ${({ isEmpty }) => (isEmpty ? '2.4rem' : '0')};
  min-height: 32rem;
`;

const SearchIcon = styled(Magnifier)`
  width: 5.2rem;
  height: 5.2rem;
`;

const EmptyText = styled(BodyRegularText)`
  line-height: 1.8;
  text-align: center;
  white-space: pre-line;
`;

const SearchConcertList = styled.ul`
  list-style: none;
`;

const SearchConcertSheet = ({
  isPastSearch = false,
  onConcertSelect,
  filterFn,
}: SearchConcertSheetProps) => {
  const { closeModal } = useModalStore(['closeModal']);
  const [searches, setSearches] = useState<string | null>('');
  const {
    data: concerts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useGetSearchConcert(searches, isPastSearch);

  const filteredConcerts = useMemo(() => {
    if (!concerts?.pages) return [];

    if (filterFn) {
      return concerts.pages.flatMap((page) => page.concertThumbnails).filter(filterFn);
    } else {
      return concerts.pages.flatMap((page) => page.concertThumbnails);
    }
  }, [concerts?.pages, filterFn]);

  const targetRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
  });

  const handleConcertSelect = (concertData: ConcertData) => {
    onConcertSelect?.(concertData);
    closeModal('bottomSheet', 'list');
  };

  const handleSearchClear = () => setSearches('');

  const isEmpty = isError || filteredConcerts.length === 0;

  const renderContent = () => {
    if (isEmpty) {
      return (
        <>
          <SearchIcon />
          <EmptyText>
            {isError
              ? `검색 결과가 없습니다. \n 정확한 공연명을 입력해주세요.`
              : '해당 공연장에서 진행된 공연이 아니에요!'}
          </EmptyText>
        </>
      );
    }

    return filterFn ? (
      // 필터링된 콘서트 목록 렌더링
      <SearchConcertList>
        {filteredConcerts.map((concert) => (
          <SearchConcertItem
            concertData={concert}
            key={concert.id}
            onClick={(data) => handleConcertSelect(data)}
          />
        ))}
      </SearchConcertList>
    ) : (
      // 원본 페이지 구조 그대로 렌더링
      concerts?.pages.map((page, pageIdx) => (
        <SearchConcertList key={pageIdx}>
          {page.concertThumbnails.map((concert) => (
            <SearchConcertItem
              concertData={concert}
              key={concert.id}
              onClick={(data) => handleConcertSelect(data)}
            />
          ))}
        </SearchConcertList>
      ))
    );
  };

  return (
    <BottomSheet name="list">
      <BottomSheet.Content>
        <SheetContainer>
          <SearchInput
            isActive
            onClear={handleSearchClear}
            onSearch={setSearches}
            onValueChange={() => setSearches(null)}
            text={SEARCH_PLACEHOLDER.concert}
          />
          <SearchResultContainer isEmpty={isEmpty}>
            {renderContent()}
            <div ref={targetRef} />
          </SearchResultContainer>
        </SheetContainer>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default SearchConcertSheet;
