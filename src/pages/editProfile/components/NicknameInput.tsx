import styled from '@emotion/styled';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { checkNickName } from 'api';
import BaseButton from 'components/buttons/BaseButton';
import type { ProfileSchemaType } from 'schemas';
import { BodyMediumText, BodyRegularText } from 'styles/Typography';
export const NicknameInput = () => {
  const {
    control,
    setError,
    formState: { errors },
  } = useFormContext<ProfileSchemaType>();
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckNickname = async (value: string) => {
    if (!value) {
      setError('nickname', {
        type: 'required',
        message: '닉네임을 입력해주세요.',
      });
      return;
    }

    try {
      setIsChecking(true);
      const { data } = await checkNickName(value);
    } catch (error) {
      setError('nickname', {
        type: 'error',
        message: '중복 확인 중 오류가 발생했습니다.',
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Wrapper>
      <BodyMediumText>닉네임</BodyMediumText>
      <InputWrapper>
        <Controller
          control={control}
          name="nickname"
          render={({ field: { value, ...rest } }) => (
            <>
              <Input {...rest} placeholder="닉네임을 입력해주세요" value={value || ''} />
              <BaseButton
                color="primary"
                isDisabled={isChecking}
                isFullWidth={false}
                onClick={() => handleCheckNickname(value)}
                size="small"
                type="button"
                variant="outline"
              >
                {isChecking ? '확인 중...' : '중복 확인'}
              </BaseButton>
            </>
          )}
        />
      </InputWrapper>
      {errors.nickname && <ErrorText>{errors.nickname.message}</ErrorText>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.6rem;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  background: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme }) => theme.colors.dark[100]};
  border: none;
  border-radius: 4px;
`;

const ErrorText = styled(BodyRegularText)`
  color: red;
  margin-top: 4px;
`;
