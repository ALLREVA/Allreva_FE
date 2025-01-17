import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import BaseButton from 'components/buttons/BaseButton';
import Dialog from 'components/dialog/Dialog';
import { usePostConcertRecord } from 'queries/concertRecord';
import { useConcertRecordStore, useModalStore } from 'stores';
import { TitleText2 } from 'styles/Typography';
import type { ConcertRecordForm } from 'types';

interface RecordSubmitDialogProps {
  recordData: ConcertRecordForm;
}

const DialogContainer = styled.div`
  position: absolute;
  z-index: 1004;
`;

const RecordSubmitDialog = ({ recordData }: RecordSubmitDialogProps) => {
  const { closeModal } = useModalStore(['closeModal']);
  const { resetRecordData } = useConcertRecordStore(['resetRecordData']);
  const { mutate } = usePostConcertRecord();
  const navigate = useNavigate();

  const handleSubmitSuccess = () => {
    resetRecordData();
    navigate('/concert-record');
    closeModal('dialog', 'confirm');
  };

  const handleApplyClick = () => {
    mutate(recordData, { onSuccess: handleSubmitSuccess });
  };

  return (
    <DialogContainer>
      <Dialog>
        <Dialog.Content>
          <TitleText2>공연 기록을 등록하시겠습니까?</TitleText2>
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
            onClick={handleApplyClick}
            size="small"
            variant="fill"
          >
            등록
          </BaseButton>
        </Dialog.Button>
      </Dialog>
    </DialogContainer>
  );
};

export default RecordSubmitDialog;
