import { useNavigate, useParams } from 'react-router-dom';

import BaseButton from 'components/buttons/BaseButton';
import Dialog from 'components/dialog/Dialog';
import { usePatchGroupChat } from 'queries/chat/usePatchGroupChat';
import { useModalStore } from 'stores';
import { TitleText2 } from 'styles/Typography';

export interface ChatFormData {
  title: string;
  description: string;
  imageFile: File;
}

interface EditChatDialogProps {
  groupChatData: ChatFormData;
}

const EditChatDialog = ({ groupChatData }: EditChatDialogProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { closeModal } = useModalStore(['closeModal']);
  const { mutate } = usePatchGroupChat();

  const handleSubmitSuccess = () => {
    navigate(`/chat/group/${id}`);
    closeModal('dialog', 'confirm');
  };

  const handleSubmitClick = () => {
    if (id) {
      const groupChatId = parseInt(id);
      mutate({ ...groupChatData, groupChatId }, { onSuccess: handleSubmitSuccess });
    }
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
