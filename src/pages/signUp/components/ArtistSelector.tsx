import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

import SimpleChip from 'components/chips/SimpleChip';
import SearchField from 'components/searchField/SearchField';
import SearchArtistSheet from 'components/sheets/SearchArtistSheet';
import type { ProfileSchemaType } from 'schemas';
import { useModalStore } from 'stores';
import { BodyMediumText } from 'styles/Typography';
import type { ArtistInfo } from 'types';

type FavoriteArtists = ProfileSchemaType['memberArtistRequests'][number];

const ArtistSelector = () => {
  const { watch, setValue } = useFormContext();
  const { openModal } = useModalStore(['openModal']);

  const artists: FavoriteArtists[] = watch('memberArtistRequests');

  const handleArtistSelect = (artist: ArtistInfo) => {
    const updatedArtists = artists;
    updatedArtists.push({ spotifyArtistId: artist.id, name: artist.name });
    setValue('memberArtistRequests', updatedArtists);
  };

  const handleArtistDelete = (artistId: string) => {
    const filteredArtists = artists.filter(
      (artist: FavoriteArtists) => artist.spotifyArtistId !== artistId
    );
    setValue('memberArtistRequests', filteredArtists);
  };

  return (
    <Wrapper>
      <BodyMediumText>관심 아티스트(선택)</BodyMediumText>
      <SearchField
        name="artist"
        onClick={() =>
          openModal(
            'bottomSheet',
            'list',
            <SearchArtistSheet onArtistSelect={handleArtistSelect} />
          )
        }
      />
      {artists && (
        <ArtistList>
          {artists.map((artist) => (
            <SimpleChip
              hasDeleteIcon
              key={artist.spotifyArtistId}
              onDeleteClick={() => handleArtistDelete(artist.spotifyArtistId)}
            >
              {artist.name}
            </SimpleChip>
          ))}
        </ArtistList>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.6rem;
  margin-bottom: 13rem;
`;

const ArtistList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

export default ArtistSelector;
