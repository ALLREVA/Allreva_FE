import styled from '@emotion/styled';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';
import { LuCircleAlert } from 'react-icons/lu';
import { NumericFormat, PatternFormat } from 'react-number-format';

import { BodyRegularText, CaptionText } from 'styles/Typography';

interface InputStyle {
  unit?: string;
}

interface InputFieldProps extends InputStyle {
  name: string; // controller 고유 이름
  placeholder?: string;
  value: string | number;
  unit?: string; // 단위 (e.g. 원/명/인승)
  pattern?: string; // 입력 포맷
  isNumber?: boolean; // 입력 값 숫자인지 여부
  isDisabled?: boolean;
  onValueChange: (value: string | number) => void;
}

const InputFieldContainer = styled.div`
  width: 100%;
`;

const InputFieldWrapper = styled.div<{ isError: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  height: 4rem;
  margin-bottom: 0.8rem;
  padding: 0 1.6rem;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme }) => theme.colors.dark[100]};
  outline: 2px solid ${({ isError, theme }) => (isError ? theme.colors.red : 'none')};
  outline-offset: -2px;

  &:focus-within {
    outline: 2px solid
      ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.primary)};
  }

  &[aria-disabled='true'] {
    background: ${({ theme }) => theme.colors.dark[700]};
    color: ${({ theme }) => theme.colors.dark[300]};
    pointer-events: none;
  }
`;

const Input = styled.input<InputStyle>`
  width: 100%;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.dark[100]};
  font-size: ${({ theme }) => theme.typography.bodyR.size};
  text-align: ${({ unit }) => (unit ? 'right' : 'start')};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark[300]};
  }
`;

const ValidationMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.red};
`;

const InputField = ({
  name,
  placeholder = '입력해주세요',
  value,
  unit,
  pattern,
  isNumber = false,
  isDisabled = false,
  onValueChange,
}: InputFieldProps) => {
  const { control } = useFormContext();

  const handleChange = (value: string | number) => {
    onValueChange(value);
  };

  const renderNumericInput = (field: ControllerRenderProps<FieldValues, string>) => (
    <NumericFormat
      {...field}
      allowNegative
      customInput={Input}
      decimalScale={0}
      isAllowed={(values) => {
        const { floatValue } = values;
        if (!values.value) return true;
        return floatValue !== undefined && floatValue >= 1 && floatValue < 1000000;
      }}
      onValueChange={(value) => {
        const numericValue = value.floatValue || 0;
        field.onChange(numericValue); // react hook form 업데이트
        handleChange(numericValue);
      }}
      placeholder={placeholder}
      thousandSeparator
      unit={unit}
      value={value}
    />
  );

  const renderPatternInput = (field: ControllerRenderProps<FieldValues, string>) =>
    pattern && (
      <PatternFormat
        {...field}
        customInput={Input}
        format={pattern}
        onValueChange={(values) => {
          // format 적용 값으로 업데이트
          field.onChange(values.formattedValue);
          handleChange(values.formattedValue);
        }}
        placeholder={placeholder}
      />
    );

  const renderTextInput = (field: ControllerRenderProps<FieldValues, string>) => (
    <Input
      {...field}
      onChange={(e) => {
        field.onChange(e.target.value);
        handleChange(e.target.value);
      }}
      placeholder={placeholder}
      type="text"
      unit={unit}
      value={value}
    />
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <InputFieldContainer>
          <InputFieldWrapper aria-disabled={isDisabled} isError={!!fieldState?.error}>
            {isNumber
              ? renderNumericInput(field)
              : pattern
                ? renderPatternInput(field)
                : renderTextInput(field)}
            {unit && <BodyRegularText>{unit}</BodyRegularText>}
          </InputFieldWrapper>
          {fieldState?.error && (
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

export default InputField;
