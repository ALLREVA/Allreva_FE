import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import ArtistSelector from './components/ArtistSelector';
import Email from './components/Email';
import Nickname from './components/Nickname';
import ShortBio from './components/ShortBio';

import AvatarUploader from 'components/avatarUploader/AvatarUploader';
import BaseButton from 'components/buttons/BaseButton';
import { usePostSignUp } from 'queries/auth';
import { usePostPresigned } from 'queries/presigned';
import type { LoginProvider } from 'types';

interface ArtistRequest {
  spotifyArtistId: string;
  name: string;
}

interface SignUpFormData {
  email: string;
  nickname: string;
  introduce: string;
  loginProvider: LoginProvider;
  imageUrl: string;
  imageFile?: File;
  memberArtistRequests?: ArtistRequest[];
}

const SignUp = () => {
  const location = useLocation();
  const userData = location.state;
  const navigate = useNavigate();

  const { mutateAsync: presignedMutate } = usePostPresigned();
  const { mutate: signUpMutate } = usePostSignUp();

  const methods = useForm<SignUpFormData>({
    defaultValues: {
      email: userData.email,
      nickname: '',
      introduce: '',
      loginProvider: 'KAKAO',
      imageUrl: userData.profileImageUrl,
      imageFile: undefined,
    },
  });

  const { watch } = methods;
  const email = watch('email');
  const imageUrl = watch('imageUrl');

  const handleSubmit = methods.handleSubmit(async (data) => {
    try {
      const { email, nickname, imageFile, imageUrl, introduce, loginProvider } = data;

      let profileUrl = imageUrl;

      if (imageFile) {
        profileUrl = await presignedMutate({ file: imageFile, fileType: 'PROFILE' });
      }

      const registerData = {
        email,
        nickname,
        introduce,
        loginProvider,
        memberArtistRequests: [{ spotifyArtistId: '', name: '' }],
        image: { url: profileUrl },
      };

      signUpMutate(registerData, { onSuccess: () => navigate('/signin') });
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  });

  return (
    <FormProvider {...methods}>
      <SignUpContainer>
        <ContentWrapper>
          <AvatarUploader imageUrl={imageUrl} />
          <Nickname />
          <Email value={email} />
          <ShortBio />
          <ArtistSelector />
        </ContentWrapper>
        <BaseButton
          color="primary"
          isFullWidth={true}
          onClick={handleSubmit}
          size="medium"
          variant="fill"
        >
          가입 완료
        </BaseButton>
      </SignUpContainer>
    </FormProvider>
  );
};

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0 2.4rem;
  background-color: #1b1d1f;
  color: ${({ theme }) => theme.colors.white};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.6rem;
  margin-top: 3.8rem;
`;

export default SignUp;
