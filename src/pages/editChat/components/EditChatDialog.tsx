import BaseButton from 'components/buttons/BaseButton';
import Dialog from 'components/dialog/Dialog';
import { useModalStore } from 'stores';
import { TitleText2 } from 'styles/Typography';

export interface ChatFormData {
  title: string;
  description: string;
  imageFile: File;
}

interface EditChatDialogProps {
  formData: ChatFormData;
}

const EditChatDialog = ({ formData }: EditChatDialogProps) => {
  const { closeModal } = useModalStore(['closeModal']);

  const handleSubmitClick = () => {
    console.log(formData);
    // closeModal('dialog', 'confirm');
  };

  return (
    <Dialog>
      <Dialog.Content>
        <TitleText2>채팅방 수정을 완료하시겠습니까?</TitleText2>
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
          완료
        </BaseButton>
      </Dialog.Button>
    </Dialog>
  );
};

export default EditChatDialog;
