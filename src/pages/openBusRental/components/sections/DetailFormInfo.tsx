import { useFormContext } from 'react-hook-form';

import RentalFormField from './RentalFormField';
import RentalFormSelect from '../items/RentalFormSelect';
import RentalInputField from '../items/RentalInputField';
import RentalThumbField from '../items/RentalThumbField';
import RentalTitleField from '../items/RentalTitleField';

import SimpleChip from 'components/chips/SimpleChip';
import SearchConcertItem from 'components/items/SearchConcertItem';
import ValidationMessage from 'components/message/ValidationMessage';
import SearchField from 'components/searchField/SearchField';
import RegionListSheet from 'components/sheets/RegionListSheet';
import SearchArtistSheet from 'components/sheets/SearchArtistSheet';
import SearchConcertSheet from 'components/sheets/SearchConcertSheet';
import { RENTAL_FORM_PLACEHOLDER } from 'constants/placeholder';
import { useModalStore, useRentalFormStore } from 'stores';
import type { ConcertData } from 'types';

const DetailFormInfo = () => {
  const {
    formState: { errors },
  } = useFormContext();
  const { openModal } = useModalStore(['openModal']);
  const { formData, concertData, updateConcertData, updateFormData } = useRentalFormStore([
    'formData',
    'concertData',
    'updateConcertData',
    'updateFormData',
  ]);

  const openSheetModal = (sheet: React.ReactNode) => {
    openModal('bottomSheet', 'list', sheet);
  };

  const handleConcertSelect = (concertData: ConcertData) => {
    updateConcertData(concertData);
    updateFormData('concertId', concertData.id);
  };

  return (
    <>
      <RentalFormField>
        <RentalFormField.Title title="메인 이미지" />
        <RentalThumbField />
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="글 제목" />
        <RentalTitleField name="title" />
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="공연명" />
        <SearchField
          name="concert"
          onClick={() =>
            openSheetModal(
              <SearchConcertSheet isRelatedHall={false} onConcertSelect={handleConcertSelect} />
            )
          }
        />
        {concertData && <SearchConcertItem concertData={concertData} isInactive />}
        {errors.concertId?.message && (
          <ValidationMessage message={errors.concertId.message as string} />
        )}
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="아티스트명" />
        <SearchField
          name="artist"
          onClick={() =>
            openSheetModal(
              <SearchArtistSheet
                onArtistSelect={(artist) => updateFormData('artistName', artist.name)}
              />
            )
          }
        />
        {formData.artistName && (
          <SimpleChip hasDeleteIcon onDeleteClick={() => updateFormData('artistName', '')}>
            {formData.artistName}
          </SimpleChip>
        )}
        {errors.artistName?.message && (
          <ValidationMessage message={errors.artistName.message as string} />
        )}
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="차대절 지역" />
        <RentalFormSelect
          name="region"
          onClick={() =>
            openSheetModal(
              <RegionListSheet onChange={(region) => updateFormData('region', region)} />
            )
          }
          placeholder={RENTAL_FORM_PLACEHOLDER.region}
        />
      </RentalFormField>
      <RentalFormField>
        <RentalFormField.Title title="입금 정보" />
        <RentalInputField name="depositAccount" />
      </RentalFormField>
    </>
  );
};

export default DetailFormInfo;
