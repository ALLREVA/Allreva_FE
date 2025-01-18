import styled from '@emotion/styled';
import type React from 'react';

import type { FiltersActive } from '../type';

import BottomSheet from 'components/bottomSheet/BottomSheet';
import { useModalStore } from 'stores';
import { BodyRegularText } from 'styles/Typography';

const region = [
  '전체',
  '서울',
  '경기',
  '인천',
  '강원',
  '세종',
  '천안',
  '청주',
  '대전',
  '대구',
  '경북',
  '부산',
  '울산',
  '마산',
  '창원',
  '경남',
  '광주',
  '전북',
  '전주',
  '전남',
];

const seatScale = [1_000, 2_000, 5_000, 10_000, 15_000];

interface ListItemProps<T extends string | number> {
  title: string;
  onSelect: (keyword: T) => void;
  setFiltersActive: React.Dispatch<React.SetStateAction<FiltersActive>>;
}

const RegionListItem = ({ onSelect, setFiltersActive }: ListItemProps<string>) => {
  const { closeModal } = useModalStore(['closeModal']);

  const handleRegionSelect = (selectedRegion: string) => {
    onSelect(selectedRegion);
    if (selectedRegion !== '전체') {
      setFiltersActive((prev) => ({
        ...prev,
        addressFilter: true,
      }));
    } else {
      setFiltersActive((prev) => ({
        ...prev,
        addressFilter: false,
      }));
    }
    closeModal('bottomSheet', 'list');
  };

  return region.map((regionName) => (
    <Item key={regionName} onClick={() => handleRegionSelect(regionName)}>
      <BodyRegularText>{regionName}</BodyRegularText>
    </Item>
  ));
};

const SeatScaleListItem = ({ onSelect, setFiltersActive }: ListItemProps<number>) => {
  const { closeModal } = useModalStore(['closeModal']);

  const handleSeatSelect = (selectedScale: number) => {
    onSelect(selectedScale);
    setFiltersActive((prev) => ({
      ...prev,
      seatScaleFilter: true,
    }));
    closeModal('bottomSheet', 'list');
  };

  return seatScale.map((seatScale) => (
    <Item key={seatScale} onClick={() => handleSeatSelect(seatScale)}>
      <BodyRegularText>{seatScale.toLocaleString()}석 이상</BodyRegularText>
    </Item>
  ));
};

const ListItem = <T extends string | number>({
  title,
  onSelect,
  setFiltersActive,
}: ListItemProps<T>) => {
  const renderListItems = () => {
    if (title === '지역') {
      return (
        <RegionListItem
          onSelect={onSelect as (value: string) => void}
          setFiltersActive={setFiltersActive}
          title={'지역'}
        />
      );
    }

    if (title === '좌석수') {
      return (
        <SeatScaleListItem
          onSelect={onSelect as (value: number) => void}
          setFiltersActive={setFiltersActive}
          title={'좌석수'}
        />
      );
    }
  };

  return (
    <BottomSheet name="list">
      <BottomSheet.Header>
        <Title>{title}</Title>
      </BottomSheet.Header>
      <BottomSheet.Content>
        <OptionList>{renderListItems()}</OptionList>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

const Title = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
`;

const OptionList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Item = styled.li`
  padding: 1.2rem;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dark[500]};
  }
`;

export default ListItem;
