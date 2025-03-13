import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { BiSolidUser } from 'react-icons/bi';
import { LuCamera } from 'react-icons/lu';

import { usePostPresigned } from 'queries/presigned/usePostPresigned';

interface AvatarUploaderProps {
  imageUrl: string;
}

const AvatarUploader = ({ imageUrl }: AvatarUploaderProps) => {
  const { setValue } = useFormContext();
  const [imageSrc, setImageSrc] = useState<string | null>(imageUrl || null);
  const { mutateAsync: presignedMutate } = usePostPresigned();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = file.type;
    if (!fileType.includes('image')) {
      alert(`지원하지 않는 이미지 형식입니다`);
      e.target.value = '';
      return;
    }

    try {
      // 미리보기 즉시 표시
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result as string;
        setImageSrc(previewUrl);
      };
      reader.readAsDataURL(file);

      // 파일 업로드 및 최종 URL 가져오기
      const fileUrl = await presignedMutate({
        file,
        fileType: 'PROFILE',
      });

      // 필드 이름에 따라 적절히 폼 값 업데이트
      setValue('image.url', fileUrl);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (imageUrl) {
      setImageSrc(imageUrl);
    }
  }, [imageUrl]);

  return (
    <AvatarUploaderContainer>
      <Input accept="image/*" id="avatarUpload" onChange={handleImageChange} type="file" />
      <Label htmlFor="avatarUpload">
        {imageSrc ? (
          <PreviewImg alt="userProfileImage" src={imageSrc} />
        ) : (
          <BiSolidUser size={64} />
        )}
        <CameraIconWrapper>
          <LuCamera size={16} />
        </CameraIconWrapper>
      </Label>
    </AvatarUploaderContainer>
  );
};

const AvatarUploaderContainer = styled.div`
  position: relative;
  width: 9.6rem;
  height: 9.6rem;
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.dark[200]};
  cursor: pointer;
  border-radius: 5rem;
`;

const CameraIconWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.8rem;
  height: 2.8rem;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10rem;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5rem;
`;

export default AvatarUploader;
// https://allreva-bucket.s3.ap-northeast-2.amazonaws.com/PROFILE/8c62c9db161f495484dda7c69c6e89fd_fishg87c0162e1_640.jpg
