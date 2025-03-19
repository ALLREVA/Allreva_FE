import styled from '@emotion/styled';
import { forwardRef } from 'react';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat, PatternFormat } from 'react-number-format';

import ValidationMessage from 'components/message/ValidationMessage';
import { RENTAL_FORM_PLACEHOLDER } from 'constants/placeholder';
import { useRentalFormStore } from 'stores';
import { BodyRegularText } from 'styles/Typography';
import type { RentalFormFields } from 'types';

interface InputStyle {
  unit?: string;
}

interface InputFieldProps extends InputStyle {
  name: keyof RentalFormFields;
  unit?: string;
  pattern?: string;
  isLive?: boolean;
  isNumeric?: boolean;
  isInactiveForm?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  onBlur?: (value: string) => void;
}

const InputFieldContainer = styled.div<{ isFullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : '18rem')};
`;

const Input = styled.input<InputStyle>`
  width: 100%;
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.typography.bodyR.size};
  text-align: ${({ unit }) => (unit ? 'right' : 'start')};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark[300]};
  }
`;

const InputFieldWrapper = styled.div<{ isError: boolean; isDisabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  height: 4rem;
  padding: 0 1.6rem;
  border-radius: 4px;
  background: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.dark[700] : theme.colors.dark[500]};
  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.dark[300] : theme.colors.dark[100]};
  outline: 2px solid
    ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.dark[500])};
  outline-offset: -2px;
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};

  &:focus-within {
    outline: 2px solid
      ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.primary)};
  }

  ${Input} {
    color: ${({ theme, isDisabled }) =>
      isDisabled ? theme.colors.dark[300] : theme.colors.dark[100]};
  }
`;

const UnitText = styled(BodyRegularText)`
  flex-shrink: 0;
`;

const RentalInputField = forwardRef<HTMLInputElement, InputFieldProps>(function RentalInputField(
  {
    name,
    unit,
    pattern,
    isLive = true,
    isNumeric,
    isDisabled = false,
    isFullWidth = true,
    onBlur,
  }: InputFieldProps,
  ref
) {
  const { control } = useFormContext();
  const { formData, updateFormData } = useRentalFormStore(['formData', 'updateFormData']);
  const placeholder = RENTAL_FORM_PLACEHOLDER[name] || '입력해주세요';

  const handleInputChange = (
    onChange: (value: string | number) => void,
    value: string | number
  ) => {
    onChange(value);
    if (isNumeric) value = Number(value);
    if (isLive) updateFormData(name, value);
  };

  const handleFocusIn = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const element = e.target;
    const length = element.value.length;
    element.setSelectionRange(length, length);
  };

  const renderInputField = (field: ControllerRenderProps<FieldValues, string>) => {
    const commonProps = {
      ...field,
      placeholder,
      'aria-disabled': isDisabled,
      ref,
      value: formData[name] || field.value || '',
    };

    if (isNumeric) {
      return (
        <NumericFormat
          {...commonProps}
          allowNegative
          customInput={Input}
          decimalScale={0}
          isAllowed={(values) => {
            const { floatValue } = values;
            if (!values.value) return true;
            return floatValue !== undefined && floatValue >= 1 && floatValue < 1000000;
          }}
          onBlur={(e) => onBlur?.(e.target.value)}
          onFocus={(e) => handleFocusIn(e)}
          onValueChange={(value) => handleInputChange(field.onChange, String(value.floatValue))}
          thousandSeparator
          unit={unit}
        />
      );
    }

    if (pattern) {
      return (
        <PatternFormat
          {...commonProps}
          customInput={Input}
          format={pattern}
          onBlur={(e) => onBlur?.(e.target.value)}
          onFocus={(e) => handleFocusIn(e)}
          onValueChange={({ formattedValue }) => handleInputChange(field.onChange, formattedValue)}
        />
      );
    }

    return (
      <Input
        {...commonProps}
        onBlur={(e) => onBlur?.(e.target.value)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange(field.onChange, e.target.value)
        }
        onFocus={(e) => handleFocusIn(e)}
        type="text"
        unit={unit}
      />
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <InputFieldContainer isFullWidth={isFullWidth}>
          <InputFieldWrapper isDisabled={isDisabled} isError={!!fieldState.error}>
            {renderInputField(field)}
            {unit && <UnitText>{unit}</UnitText>}
          </InputFieldWrapper>
          {fieldState.error?.message && <ValidationMessage message={fieldState.error.message} />}
        </InputFieldContainer>
      )}
    />
  );
});

export default RentalInputField;
