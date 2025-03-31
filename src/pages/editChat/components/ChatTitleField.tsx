import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import ValidationMessage from 'components/message/ValidationMessage';
import { CaptionText } from 'styles/Typography';

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

const MAX_LENGTH = 20;

const ChatTitleField = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="title"
      render={({ field, fieldState }) => {
        const { value } = field;
        const { error } = fieldState;
        const isError = !!error;
        const charCount = value?.length;

        return (
          <>
            <InputFieldContainer>
              <TitleInput
                {...field}
                isError={isError}
                maxLength={MAX_LENGTH}
                placeholder="채팅방 제목을 입력해주세요"
                type="text"
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

export default ChatTitleField;
