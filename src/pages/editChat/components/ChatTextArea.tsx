import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import ValidationMessage from 'components/message/ValidationMessage';

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

const ChatTextArea = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="description"
      render={({ field, fieldState }) => (
        <TextAreaContainer>
          <TextAreaField {...field} placeholder="채팅방 소개를 입력해주세요" />
          {fieldState?.error && fieldState.error.message && (
            <ValidationMessage message={fieldState.error.message} />
          )}
        </TextAreaContainer>
      )}
    />
  );
};

export default ChatTextArea;
