import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';
import { LuCircleAlert } from 'react-icons/lu';

import { CaptionText } from 'styles/Typography';

interface TitleFieldProps {
  name: string; // controller 고유 이름
  placeholder?: string;
  value: string;
  maxCount?: number; // 최대 글자 수
  isDisabled?: boolean;
  onValueChange: (value: string) => void;
}

const InputFieldContainer = styled.div`
  width: 100%;
`;

const TitleInput = styled.input<{ isError: boolean }>`
  width: 100%;
  min-width: 24rem;
  height: 4rem;
  margin-bottom: 0.8rem;
  padding: 0 0.4rem;
  border: none;
  border-bottom: 2px solid
    ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.dark[500])};
  background: none;
  color: ${({ theme }) => theme.colors.dark[100]};
  font-size: ${({ theme }) => theme.typography.title2.size};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark[500]};
  }

  &[aria-disabled='true'] {
    border-bottom: 2px solid ${({ theme }) => theme.colors.dark[700]};
    color: ${({ theme }) => theme.colors.dark[700]};
    pointer-events: none;

    &::placeholder {
      color: ${({ theme }) => theme.colors.dark[700]};
    }
  }
`;

const CharCount = styled(CaptionText)<{ isError: boolean }>`
  display: block;
  color: ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.dark[500])};

  &[aria-disabled='true'] {
    color: ${({ theme }) => theme.colors.dark[700]};
  }
`;

const ValidationMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.red};
`;

const TitleInputField = ({
  name,
  placeholder = '입력해주세요',
  value,
  maxCount,
  isDisabled = false,
  onValueChange,
}: TitleFieldProps) => {
  const { control } = useFormContext();

  const handleChange = (value: string) => {
    if (!maxCount) onValueChange(value);

    if (maxCount && value.length <= maxCount) {
      onValueChange(value);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <InputFieldContainer>
          <TitleInput
            {...field}
            aria-disabled={isDisabled}
            isError={!!fieldState?.error}
            maxLength={maxCount}
            onChange={(e) => {
              field.onChange(e.target.value);
              handleChange(e.target.value);
            }}
            placeholder={placeholder}
            type="text"
            value={value}
          />
          {maxCount && (
            <CharCount aria-disabled={isDisabled} isError={!!fieldState?.error}>
              {value.length} / {maxCount}자
            </CharCount>
          )}
          {!maxCount && fieldState?.error && (
            <ValidationMessage>
              <LuCircleAlert size={18} />
              <CaptionText>{fieldState.error.message}</CaptionText>
            </ValidationMessage>
          )}
        </InputFieldContainer>
      )}
    />
  );
};

export default TitleInputField;
