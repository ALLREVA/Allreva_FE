import styled from '@emotion/styled';

import { BodyMediumText } from 'styles/Typography';
import type { ArtistInfo } from 'types';

interface SearchArtistItemProps {
  artistInfo: ArtistInfo;
  onClick: (artist: ArtistInfo) => void;
}

const ArtistItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  padding: 1.2rem 0;
  cursor: pointer;
`;

const ArtistImgContainer = styled.div`
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
`;

const ArtistImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ArtistName = styled(BodyMediumText)`
  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.dark[100]};
    text-decoration: underline;
  }
`;

const SearchArtistItem = ({ artistInfo, onClick }: SearchArtistItemProps) => {
  return (
    <ArtistItemContainer onClick={() => onClick(artistInfo)}>
      <ArtistImgContainer>
        <ArtistImg alt="Artist Image" src={artistInfo.image} />
      </ArtistImgContainer>
      <ArtistName>{artistInfo.name}</ArtistName>
    </ArtistItemContainer>
  );
};

export default SearchArtistItem;
