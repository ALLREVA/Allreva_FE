import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import ValidationMessage from 'components/message/ValidationMessage';
import { RENTAL_FORM_PLACEHOLDER } from 'constants/placeholder';
import { useRentalFormStore } from 'stores';
import type { RentalFormFields } from 'types';

interface RentalTextAreaProps {
  name: keyof RentalFormFields;
}

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`;

const TextAreaField = styled.textarea`
  overflow: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: 100%;
  min-height: 12rem;
  padding: 1.6rem;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme }) => theme.colors.dark[100]};
  font-size: ${({ theme }) => theme.typography.bodyR.size};
  outline: none;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark[300]};
  }
`;

const RentalTextArea = ({ name }: RentalTextAreaProps) => {
  const { control } = useFormContext();
  const { updateFormData } = useRentalFormStore(['updateFormData']);

  const placeholder = RENTAL_FORM_PLACEHOLDER[name] || '입력해주세요';

  const handleInputChange = (
    onChange: (value: string | number) => void,
    value: string | number
  ) => {
    onChange(value);
    updateFormData(name, value);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextAreaContainer>
          <TextAreaField
            {...field}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleInputChange(field.onChange, e.target.value)
            }
            placeholder={placeholder}
          />
          {fieldState?.error && fieldState.error.message && (
            <ValidationMessage message={fieldState.error.message} />
          )}
        </TextAreaContainer>
      )}
    />
  );
};

export default RentalTextArea;
