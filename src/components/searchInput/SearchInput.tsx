import styled from '@emotion/styled';
import type React from 'react';
import { useState } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';

// 검색별 api 요청 메서드를 onSearch, spaceholder 값인 text, 검색 활성/비활성화 유무에 따른 isActive 값을 넘겨주시면 됩니다!
interface SearchInputProps {
  text: string;
  isActive: boolean;
  onSearch: (query: string) => void;
}
const SearchInput = ({ text, isActive, onSearch }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      onSearch(searchValue);
    }
  };

  return (
    <SearchInputContainer isActive={isActive}>
      <IoSearch size={24} />
      <Input
        hasValue={!!searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={text}
        type="search"
        value={isActive ? searchValue : ''}
      />
      {searchValue && <ClearButton onClick={() => setSearchValue('')} size={24} />}
    </SearchInputContainer>
  );
};

const SearchInputContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border-radius: 0.4rem;
  width: 100%;
  height: 4rem;
  padding: 0 1.2rem;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.dark[500] : theme.colors.dark[700]};
  color: ${({ theme, isActive }) => (isActive ? theme.colors.dark[300] : theme.colors.dark[500])};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};

  svg {
    flex-shrink: 0;
  }
`;

const Input = styled.input<{ hasValue: boolean }>`
  width: 100%;
  font-size: ${({ theme }) => theme.typography.bodyR.size};
  line-height: ${({ theme }) => theme.typography.bodyR.lineHeight};
  font-weight: ${({ theme }) => theme.typography.bodyR.weight};
  color: ${({ theme, hasValue }) => (hasValue ? theme.colors.white : 'inherit')};
  border: none;
  background-color: transparent;
  outline: none;
  user-select: none;

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
`;

const ClearButton = styled(FaCircleXmark)`
  cursor: pointer;
`;

export default SearchInput;
