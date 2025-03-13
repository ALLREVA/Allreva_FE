import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

import { endPoint } from 'constants/endPoint';
import { useAuthStore } from 'stores/authStore';
import { tokenAxios } from 'utils';

// 스타일링된 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const LoadingText = styled.p`
  margin-top: 6rem;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.dark[800]};
  text-align: center;
`;

const SubText = styled.p`
  margin-top: 1.2rem;

  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.dark[500]};
  text-align: center;
`;

interface CallbackResultResponse {
  isUser: boolean;
  email: string;
  nickname: string;
  profileImageUrl: string;
}

interface CallbackRequest {
  timeStamp: string;
  code: string;
  message: string;
  result: CallbackResultResponse;
}
const Callback = () => {
  const params = new URL(document.URL).searchParams;
  const code = params.get('code');
  const navigate = useNavigate();
  const { setUserProfile, setIsLoggedIn, setToken } = useAuthStore([
    'setUserProfile',
    'setIsLoggedIn',
    'setToken',
  ]);

  const getUserKakaoInfo = async (): Promise<{ data: CallbackRequest; token: string | null }> => {
    const { data, headers } = await tokenAxios.get<CallbackRequest>(endPoint.AUTH_KAKAO, {
      params: {
        code: code,
      },
    });

    const token = headers['authorization'] || headers['Authorization'];

    return { data, token };
  };

  const setTokenStorage = (data: CallbackResultResponse, token: string | null) => {
    if (token) {
      tokenAxios.defaults.headers.common['Authorization'] = token;
      setIsLoggedIn();
      setUserProfile(data);
      setToken(token);
    }
  };

  const { mutate } = useMutation({
    mutationFn: getUserKakaoInfo,
    onSuccess: ({ data, token }) => {
      if (data?.result.isUser) {
        setTokenStorage(data.result, token);
        navigate('/');
      } else {
        navigate('/signup', {
          state: {
            email: data.result.email,
            profileImageUrl: data.result.profileImageUrl,
          },
        });
      }
    },
  });

  useEffect(() => {
    if (code) {
      mutate();
    }
  }, [code, mutate]);

  return (
    <Container>
      <HashLoader color="#5E45BF" size={80} />
      <LoadingText>로그인 정보를 확인하고 있습니다</LoadingText>
      <SubText>잠시만 기다려주세요...</SubText>
    </Container>
  );
};

export default Callback;
