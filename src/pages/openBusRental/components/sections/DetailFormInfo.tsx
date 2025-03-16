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
import type { REGIONS } from 'constants/filterTypes';
import { RENTAL_FORM_PLACEHOLDER } from 'constants/placeholder';
import { useModalStore, useRentalFormStore } from 'stores';
import type { ArtistInfo, ConcertData } from 'types';

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

  const handleArtistSelect = (artist: ArtistInfo) => {
    updateFormData('artistName', artist.name);
  };

  const handleArtistDelete = () => {
    updateFormData('artistName', '');
  };

  const handleRegionChange = (region: (typeof REGIONS)[number]) => {
    updateFormData('region', region);
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
            openSheetModal(<SearchConcertSheet onConcertSelect={handleConcertSelect} />)
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
          onClick={() => openSheetModal(<SearchArtistSheet onArtistSelect={handleArtistSelect} />)}
        />
        {formData.artistName && (
          <SimpleChip hasDeleteIcon onDeleteClick={handleArtistDelete}>
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
          onClick={() => openSheetModal(<RegionListSheet onChange={handleRegionChange} />)}
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
