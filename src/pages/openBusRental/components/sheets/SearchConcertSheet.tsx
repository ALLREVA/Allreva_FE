import styled from '@emotion/styled';
import { useState } from 'react';

import SearchConcertItem from '../items/SearchConcertItem';

import Magnifier from 'assets/images/magnifier-icon.svg?react';
import BottomSheet from 'components/bottomSheet/BottomSheet';
import SearchInput from 'components/searchInput/SearchInput';
import { SEARCH_PLACEHOLDER } from 'constants/placeholder';
import { useGetSearchConcert } from 'queries/rentForm/useGetSearchConcert';
import { useModalStore } from 'stores';
import { BodyRegularText } from 'styles/Typography';
import type { ConcertData } from 'types';

interface SearchConcertSheetProps {
  onConcertSelect?: (data: ConcertData) => void;
}

const SheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const SearchResultContainer = styled.div<{ isError: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ isError }) => (isError ? 'center' : 'flex-start')};
  align-items: ${({ isError }) => (isError ? 'center' : 'flex-start')};
  gap: ${({ isError }) => (isError ? '2.4rem' : '0')};
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

const SearchConcertSheet = ({ onConcertSelect }: SearchConcertSheetProps) => {
  const { closeModal } = useModalStore(['closeModal']);
  const [searches, setSearches] = useState<string | null>('');
  const { data: concerts, isError } = useGetSearchConcert(searches);

  const handleConcertSelect = (concertData: ConcertData) => {
    onConcertSelect?.(concertData);
    closeModal('bottomSheet', 'list');
  };

  const handleSearchClear = () => setSearches('');

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
          <SearchResultContainer isError={isError}>
            {isError ? (
              <>
                <SearchIcon />
                <EmptyText>{`검색 결과가 없습니다. \n 정확한 공연명을 입력해주세요.`}</EmptyText>
              </>
            ) : (
              concerts?.map((concert) => (
                <SearchConcertItem
                  concertData={concert}
                  key={concert.id}
                  onClick={(data) => handleConcertSelect(data)}
                />
              ))
            )}
          </SearchResultContainer>
        </SheetContainer>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default SearchConcertSheet;
