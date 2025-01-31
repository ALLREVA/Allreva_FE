import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import BaseButton from 'components/buttons/BaseButton';
import Dialog from 'components/dialog/Dialog';
import { useDeleteGroupChat, useLeaveGroupChat, useLeaveSingleChat } from 'queries/chat';
import { useModalStore } from 'stores';
import { BodyRegularText, TitleText2 } from 'styles/Typography';
import type { ChatType } from 'types';

interface ExitDialogProps {
  chatType: ChatType;
  chatId: number;
  isManager: boolean;
}

const ExitDialogContainer = styled.div`
  position: absolute;
  z-index: 1004;
`;

const ExitDialogTitle = styled(TitleText2)`
  margin-bottom: 1.6rem;
`;

const ExitDialogDescription = styled(BodyRegularText)`
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const ExitDialog = ({ chatType, chatId, isManager }: ExitDialogProps) => {
  const navigate = useNavigate();
  const { closeModal } = useModalStore(['closeModal']);
  const { mutate: leaveGroupChatMutate } = useLeaveGroupChat();
  const { mutate: leaveSingleChatMutate } = useLeaveSingleChat();
  const { mutate: deleteGroupChatMutate } = useDeleteGroupChat();

  const handleSubmitSuccess = () => {
    navigate('/chat');
    closeModal('dialog', 'confirm');
  };

  const handleExitClick = () => {
    if (chatType === 'SINGLE') {
      return leaveSingleChatMutate(chatId, { onSuccess: handleSubmitSuccess });
    }

    if (chatType === 'GROUP' && isManager) {
      return deleteGroupChatMutate(chatId, { onSuccess: handleSubmitSuccess });
    }

    return leaveGroupChatMutate(chatId, { onSuccess: handleSubmitSuccess });
  };

  return (
    <ExitDialogContainer>
      <Dialog>
        <Dialog.Content>
          <ExitDialogTitle>채팅방을 나가시겠습니까?</ExitDialogTitle>
          <ExitDialogDescription>삭제된 채팅방은 복구되지 않습니다.</ExitDialogDescription>
        </Dialog.Content>
        <Dialog.Button>
          <BaseButton
            color="primary"
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
            onClick={handleExitClick}
            size="small"
            variant="fill"
          >
            나가기
          </BaseButton>
        </Dialog.Button>
      </Dialog>
    </ExitDialogContainer>
  );
};

export default ExitDialog;
