import styled from '@emotion/styled';

import BaseButton from 'components/buttons/BaseButton';
import Dialog from 'components/dialog/Dialog';
import { useModalStore } from 'stores';
import { BodyRegularText, TitleText2 } from 'styles/Typography';

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

const ExitDialog = () => {
  const { closeModal } = useModalStore(['closeModal']);

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
            onClick={() => {}}
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
