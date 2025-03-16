import styled from '@emotion/styled';
import { useState } from 'react';

import BottomSheet from 'components/bottomSheet/BottomSheet';
import SearchArtistItem from 'components/items/SearchArtistItem';
import SearchInput from 'components/searchInput/SearchInput';
import { SEARCH_PLACEHOLDER } from 'constants/placeholder';
import { useGetSearchArtist } from 'queries/search/useGetSearchArtist';
import { useModalStore } from 'stores';
import type { ArtistInfo } from 'types';

interface SearchArtistSheetProps {
  onArtistSelect: (artistInfo: ArtistInfo) => void;
}

const SheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const SearchResultContainer = styled.div<{ isError?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ isError }) => (isError ? 'center' : 'flex-start')};
  align-items: ${({ isError }) => (isError ? 'center' : 'flex-start')};
  gap: ${({ isError }) => (isError ? '2.4rem' : '0')};
  min-height: 32rem;
`;

const SearchArtistSheet = ({ onArtistSelect }: SearchArtistSheetProps) => {
  const { closeModal } = useModalStore(['closeModal']);
  const [searches, setSearches] = useState<string | null>('');
  const { data: artists } = useGetSearchArtist(searches);

  const handleArtistSelect = (artistInfo: ArtistInfo) => {
    onArtistSelect(artistInfo);
    closeModal('bottomSheet', 'list');
  };

  return (
    <BottomSheet name="list">
      <BottomSheet.Content>
        <SheetContainer>
          <SearchInput
            isActive
            onClear={() => setSearches('')}
            onSearch={setSearches}
            onValueChange={() => setSearches(null)}
            text={SEARCH_PLACEHOLDER.artist}
          />
          <SearchResultContainer>
            {artists?.map((artist) => (
              <SearchArtistItem
                artistInfo={{
                  id: artist.id,
                  name: artist.name,
                  image: artist.images[2].url,
                }}
                key={artist.id}
                onClick={(artist) => handleArtistSelect(artist)}
              />
            ))}
          </SearchResultContainer>
        </SheetContainer>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default SearchArtistSheet;
