import styled from '@emotion/styled';

import type { FiltersActive } from '../type';

import FilterChip from 'components/chips/FilterChip';

interface FilterChipsProps {
  selectedAddress: string;
  selectedSeatScale: number | null;
  handleAddressSelect: (value: string) => void;
  handleSeatScaleSelect: (value: number) => void;
  handleModalOpen: <T extends string | number>(title: string, handler: (value: T) => void) => void;
  filtersActive: FiltersActive;
}

const FilterChips = ({
  handleAddressSelect,
  handleSeatScaleSelect,
  selectedAddress,
  selectedSeatScale,
  handleModalOpen,
  filtersActive,
}: FilterChipsProps) => {
  return (
    <Container>
      <FilterChip
        isActive={filtersActive.addressFilter}
        onClick={() => handleModalOpen('지역', handleAddressSelect)}
      >
        {selectedAddress}
      </FilterChip>
      <FilterChip
        isActive={filtersActive.seatScaleFilter}
        onClick={() => handleModalOpen('좌석수', handleSeatScaleSelect)}
      >
        {selectedSeatScale === null
          ? '좌석 규모'
          : selectedSeatScale.toLocaleString().toString() + '석 이상'}
      </FilterChip>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 12px;
`;

export default FilterChips;
