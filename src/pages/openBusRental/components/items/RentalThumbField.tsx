import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { LuCamera } from 'react-icons/lu';
import { TbX } from 'react-icons/tb';

import ValidationMessage from 'components/message/ValidationMessage';
import type { RentalFormSchemaType } from 'schemas';
import { useRentalFormStore } from 'stores';
import { ChipText } from 'styles/Typography';
import { hexToRgba } from 'utils';

const ImageFieldWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.2rem;
`;

const ImageAddButton = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  width: 12rem;
  height: 12rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.dark[700]};
  color: ${({ theme }) => theme.colors.dark[200]};
  cursor: pointer;

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.dark[50]};
  }
`;

const ImageCount = styled(ChipText)`
  color: ${({ theme }) => theme.colors.dark[300]};
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
  width: 12rem;
  height: 12rem;
`;

const ImagePreview = styled.div<{ $url: string }>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-image: url(${(props) => props.$url});
  background-size: cover;
  background-position: center;
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 2.8rem;
  height: 2.8rem;
  background-color: ${({ theme }) => hexToRgba(theme.colors.dark[700], 0.4)};
  color: ${({ theme }) => theme.colors.dark[50]};

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.dark[200]};
  }
`;

const FIELD_NAME = 'imageUrl';

const RentalThumbField = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<RentalFormSchemaType>();
  const { formData, updateFormData } = useRentalFormStore(['formData', 'updateFormData']);
  const [previewImage, setPreviewImage] = useState('');

  const updatePreview = (file: File) => {
    // 이미지 미리보기
    const reader = new FileReader();
    reader.onload = () => {
      setValue(FIELD_NAME, reader.result as string);
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (formData.imageUrl) {
      updatePreview(formData.imageUrl);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    updatePreview(file);
    updateFormData(FIELD_NAME, file);
  };

  const handleImageDelete = () => {
    setValue(FIELD_NAME, null, { shouldValidate: true });
    updateFormData(FIELD_NAME, null);
  };

  const renderImage = () => {
    if (previewImage) {
      return (
        <ImagePreviewWrapper>
          <ImagePreview $url={previewImage}>
            <DeleteButton onClick={handleImageDelete}>
              <TbX size={24} />
            </DeleteButton>
          </ImagePreview>
        </ImagePreviewWrapper>
      );
    }

    return (
      <ImageAddButton>
        <input accept="image/*" hidden onChange={handleImageUpload} type="file" />
        <LuCamera size={24} />
        <ImageCount>0 / 1</ImageCount>
      </ImageAddButton>
    );
  };

  return (
    <Controller
      control={control}
      name={FIELD_NAME}
      render={() => (
        <>
          <ImageFieldWrapper>{renderImage()}</ImageFieldWrapper>
          {FIELD_NAME in errors && errors[FIELD_NAME] && errors[FIELD_NAME].message && (
            <ValidationMessage message={errors[FIELD_NAME].message} />
          )}
        </>
      )}
    />
  );
};

export default RentalThumbField;
