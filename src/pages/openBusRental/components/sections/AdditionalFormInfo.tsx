import RentalFormSelect from '../items/RentalFormSelect';
import RentalInputField from '../items/RentalInputField';
import TextArea from '../items/TextArea';
import RefundTypeRadio from '../lists/RefundTypeRadio';
import RentalFormField from '../RentalFormField';
import EndDateSheet from '../sheets/EndDateSheet';

import { RENTAL_FORM_PLACEHOLDER } from 'constants/placeholder';
import { useModalStore } from 'stores';

const AdditionalFormInfo = () => {
  const { openModal } = useModalStore(['openModal']);

  const handleSelectClick = () => {
    openModal('bottomSheet', 'list', <EndDateSheet />);
  };

  return (
    <>
      <RentalFormField isHorizontal>
        <RentalFormField.Title title="모집 인원" />
        <RentalInputField isFullWidth={false} isNumeric name="recruitmentCount" unit="명" />
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="모집 마감 날짜" />
        <RentalFormSelect
          name="endDate"
          onClick={handleSelectClick}
          placeholder={RENTAL_FORM_PLACEHOLDER.endDate}
        />
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title
          description="폼 작성을 완료한 사용자에게 전달됩니다."
          title="채팅방 링크"
        />
        <RentalInputField name="chatUrl" />
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title
          description="마감 기간까지 인원 미달 시 진행 옵션"
          title="환불 정책"
        />
        <RefundTypeRadio />
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="기타 안내 사항" />
        <TextArea name="information" />
      </RentalFormField>
    </>
  );
};

export default AdditionalFormInfo;