import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { BiSolidCamera } from 'react-icons/bi';
import { TbArrowUp, TbPhotoFilled } from 'react-icons/tb';

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  max-height: 12rem;
  padding: 1.4rem 2.4rem;
  background-color: ${({ theme }) => theme.colors.dark[800]};
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GalleryButton = styled.button`
  ${buttonStyle}
  color: ${({ theme }) => theme.colors.dark[200]};

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.dark[100]};
  }
`;

const CameraButton = styled.button`
  ${buttonStyle}
  color: ${({ theme }) => theme.colors.dark[200]};

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.dark[100]};
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.8rem;
  width: 100%;
  height: auto;
  min-height: 3.6rem;
  padding: 0.6rem 0.4rem 0.6rem 1.6rem;
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.dark[500]};
`;

const Input = styled.textarea`
  flex: 1;
  overflow: hidden;
  max-height: 8rem;
  height: 2.6rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme }) => theme.colors.dark[100]};
  font-size: ${({ theme }) => theme.typography.bodyR.size};
  line-height: ${({ theme }) => theme.typography.bodyM.lineHeight};
  outline: none;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark[300]};
  }
`;

const SubmitButton = styled.button`
  ${buttonStyle}
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

const ChatInput = () => {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleResize = (e: FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    // 기존 높이 초기화
    target.style.height = '2.6rem';
    // 텍스트에 맞춰 높이 조정
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <ChatInputContainer>
      <GalleryButton>
        <TbPhotoFilled size={22} />
      </GalleryButton>
      <CameraButton>
        <BiSolidCamera size={24} />
      </CameraButton>
      <InputContainer>
        <Input
          onChange={handleChange}
          onInput={handleResize}
          placeholder="메시지를 입력하세요"
          value={value}
        />
        <SubmitButton>
          <TbArrowUp size={20} />
        </SubmitButton>
      </InputContainer>
    </ChatInputContainer>
  );
};

export default ChatInput;
