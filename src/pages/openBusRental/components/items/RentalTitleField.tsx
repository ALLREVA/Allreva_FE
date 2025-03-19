import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import ValidationMessage from 'components/message/ValidationMessage';
import { RENTAL_FORM_PLACEHOLDER } from 'constants/placeholder';
import { useRentalFormStore } from 'stores';
import { CaptionText } from 'styles/Typography';
import type { RentalFormFields } from 'types';

interface RentalTitleFieldProps {
  name: keyof RentalFormFields;
  unit?: string;
  pattern?: string;
  isDisabled?: boolean;
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
`;

const CharCount = styled(CaptionText)<{ isError: boolean }>`
  display: block;
  color: ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.dark[500])};
`;

const MAX_LENGTH = 45;

const RentalTitleField = ({ name }: RentalTitleFieldProps) => {
  const { control } = useFormContext();
  const { formData, updateFormData } = useRentalFormStore(['formData', 'updateFormData']);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value, onChange } = field;
        const { error } = fieldState;
        const isError = !!error;
        const placeholder = RENTAL_FORM_PLACEHOLDER[name] || '입력해주세요';
        const charCount = value?.length || formData['title'].length;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value;
          onChange(newValue);
          updateFormData(name, newValue);
        };

        return (
          <>
            <InputFieldContainer>
              <TitleInput
                {...field}
                isError={isError}
                maxLength={MAX_LENGTH}
                onChange={handleChange}
                placeholder={placeholder}
                type="text"
                value={formData[name] || value}
              />
              <CharCount isError={isError}>
                {charCount} / {MAX_LENGTH}자
              </CharCount>
            </InputFieldContainer>
            {isError && error.message && <ValidationMessage message={error.message} />}
          </>
        );
      }}
    />
  );
};

export default RentalTitleField;
