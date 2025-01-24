import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { PiPencilSimpleBold } from 'react-icons/pi';

import IconButton from 'components/buttons/IconButton';

interface ThumbnailUploadProps {
  thumbnail: string;
}

const ThumbnailContainer = styled.div`
  flex-shrink: 0;
  position: relative;
  width: 9.6rem;
  height: 9.6rem;
`;

const ThumbnailImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`;

const EditButton = styled.div`
  position: absolute;
  bottom: -1.2rem;
  right: -1.2rem;
  z-index: 100;
`;

const ImageInput = styled.input`
  display: none;
`;

const ThumbnailUpload = ({ thumbnail }: ThumbnailUploadProps) => {
  const [imageUrl, setImageUrl] = useState<string>(thumbnail);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, setValue } = useFormContext();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImageUrl(fileUrl);
      setValue('imageFile', file);
    }
  };

  const handleFileInputClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <ThumbnailContainer>
      <ThumbnailImg alt="preview image" src={imageUrl} />
      <Controller
        control={control}
        defaultValue={null}
        name="imageFile"
        render={() => (
          <>
            <ImageInput
              accept="image/*"
              hidden
              onChange={(e) => handleFileChange(e)}
              ref={fileInputRef}
              type="file"
            />
            <EditButton onClick={handleFileInputClick}>
              <IconButton size="small">
                <PiPencilSimpleBold size={16} />
              </IconButton>
            </EditButton>
          </>
        )}
      />
    </ThumbnailContainer>
  );
};

export default ThumbnailUpload;
