import { css } from '@emotion/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { EmailInput, NicknameInput, IntroduceInput } from './index';

import { updateUserProfile } from 'api';
import AvatarUploader from 'components/avatarUploader/AvatarUploader';
import BaseButton from 'components/buttons/BaseButton';
import type { ProfileSchemaType } from 'schemas';
import { userProfileSchema } from 'schemas';
import type { UserInfo } from 'types';

interface EditProfileFormProps {
  userProfile: UserInfo;
}

const EditProfileForm = ({ userProfile }: EditProfileFormProps) => {
  const navigate = useNavigate();
  const methods = useForm<ProfileSchemaType>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: userProfile
      ? {
          email: userProfile.email,
          nickname: userProfile.nickname,
          introduce: userProfile.introduce || '',
          loginProvider: 'KAKAO',
          memberArtistRequests: userProfile.artists.map((artist) => ({
            spotifyArtistId: artist.artistId,
            name: artist.name,
          })),
          image: {
            url: userProfile.profileImageUrl,
          },
        }
      : undefined,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: ProfileSchemaType) => {
      return await updateUserProfile(data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      navigate(-1);
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <FormProvider {...methods}>
      <form css={contentContainer} onSubmit={onSubmit}>
        <AvatarUploader imageUrl={userProfile?.profileImageUrl || ''} />
        <NicknameInput />
        <EmailInput />
        <IntroduceInput />
        <BaseButton color="primary" size="medium" type="submit" variant="fill">
          수정
        </BaseButton>
      </form>
    </FormProvider>
  );
};

const contentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  padding: 2rem 2.4rem;
`;

export default EditProfileForm;
