import styled from '@emotion/styled';

import AnimatedLogo from './components/AnimateLogo';
import ShiningButton from './components/ShiningButton';
import Tagline from './components/Tagline';

import logo from 'assets/Logo.svg';
import { MediumButtonText } from 'styles/Typography';

const SignIn = () => {
  const Rest_api_key = import.meta.env.VITE_REST_API_KEY;
  const redirect_uri = import.meta.env.VITE_REDIRECT_URI;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <SignInContainer>
      <LogoWrapper>
        <img alt="logo" src={logo} />
        <Tagline />
        <AnimatedLogo />
      </LogoWrapper>

      <ButtonWrapper>
        <ShiningButton onClick={handleLogin}>
          <MediumButtonText>카카오톡으로 시작하기</MediumButtonText>
        </ShiningButton>
      </ButtonWrapper>
    </SignInContainer>
  );
};

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  padding: 3.2rem 2.4rem;
  background: linear-gradient(to bottom, #ac99fb, #130e2a);
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6rem;
  margin-top: 10rem;

  img {
    width: 22rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 6rem;
`;

export default SignIn;
