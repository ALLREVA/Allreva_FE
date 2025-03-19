import { useNavigate } from 'react-router-dom';

import BaseButton from 'components/buttons/BaseButton';
import Dialog from 'components/dialog/Dialog';
import { usePostPresigned } from 'queries/presigned';
import { usePostRentalForm } from 'queries/rentForm';
import { rentalFormStore, useModalStore, useRentalFormStore } from 'stores';
import { TitleText2 } from 'styles/Typography';

const FormSubmitDialog = () => {
  const navigate = useNavigate();
  const { closeModal } = useModalStore(['closeModal']);
  const { formData, resetFormData } = useRentalFormStore(['formData', 'resetFormData']);
  const { mutate: rentalFormMutate } = usePostRentalForm();
  const { mutateAsync: presignedMutate } = usePostPresigned();

  const handleSubmitSuccess = () => {
    resetFormData();
    rentalFormStore.persist.clearStorage();
    navigate('/bus-rental');
    closeModal('dialog', 'confirm');
  };

  const handleSubmitClick = async () => {
    try {
      const { imageUrl, ...rest } = formData;

      if (!imageUrl) throw new Error('메인 이미지가 없습니다.');

      const presignedUrl = await presignedMutate({ file: imageUrl, fileType: 'RENT' });
      const newFormData = {
        ...rest,
        image: { url: presignedUrl },
      };

      rentalFormMutate(newFormData, { onSuccess: handleSubmitSuccess });
    } catch (error) {
      console.log('폼 등록 실패:', error);
    }
  };

  return (
    <Dialog>
      <Dialog.Content>
        <TitleText2>차량 대절 폼을 등록하시겠습니까?</TitleText2>
      </Dialog.Content>
      <Dialog.Button>
        <BaseButton
          color="dark"
          isFullWidth={false}
          onClick={() => closeModal('dialog', 'confirm')}
          size="small"
          variant="outline"
        >
          취소
        </BaseButton>
        <BaseButton
          color="primary"
          isFullWidth={false}
          onClick={handleSubmitClick}
          size="small"
          variant="fill"
        >
          등록
        </BaseButton>
      </Dialog.Button>
    </Dialog>
  );
};

export default FormSubmitDialog;
