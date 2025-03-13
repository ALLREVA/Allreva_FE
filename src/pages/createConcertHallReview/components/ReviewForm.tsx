import styled from '@emotion/styled';
import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import ConcertDateSelector from './ConcertDateSelector';

import SearchConcertItem from 'components/items/SearchConcertItem';
import SearchField from 'components/searchField/SearchField';
import SearchConcertSheet from 'components/sheets/SearchConcertSheet';
import { SEAT_REVIEW_PLACEHOLDER } from 'constants/placeholder';
import type { SeatReviewSchemaType } from 'schemas/seatReviewSchema';
import { useModalStore } from 'stores';
import { BodyMediumText } from 'styles/Typography';
import type { ConcertData } from 'types';

const ConcertInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
`;

const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const FormFieldLabel = styled(BodyMediumText)`
  color: ${({ theme }) => theme.colors.white};
`;

const FormFieldValue = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  padding: 1.2rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme }) => theme.colors.dark[300]};
  font-size: ${({ theme }) => theme.typography.bodyR.size};
  line-height: ${({ theme }) => theme.typography.bodyR.lineHeight};
`;

const Input = styled.input<{ isError: boolean }>`
  width: 100%;
  height: 4rem;
  padding: 0 1.6rem;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.dark[100]};
  background: ${({ theme }) => theme.colors.dark[500]};
  font-size: ${({ theme }) => theme.typography.bodyR.size};
  outline: 2px solid
    ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.dark[500])};
  outline-offset: -2px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark[300]};
  }

  &:focus-within {
    outline: 2px solid
      ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.primary)};
  }
`;

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`;

const TextAreaField = styled.textarea<{ isError: boolean }>`
  overflow: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: 100%;
  min-height: 12rem;
  padding: 1.6rem;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme }) => theme.colors.dark[100]};
  font-size: ${({ theme }) => theme.typography.bodyR.size};
  outline: 2px solid
    ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.dark[500])};
  outline-offset: -2px;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark[300]};
  }

  &:focus-within {
    outline: 2px solid
      ${({ isError, theme }) => (isError ? theme.colors.red : theme.colors.primary)};
  }
`;

const Asterisk = styled.span`
  color: ${({ theme }) => theme.colors.red};
`;

interface ReviewFormProps {
  isFromMypage: boolean;
}

const ReviewForm = ({ isFromMypage }: ReviewFormProps) => {
  const [concertData, setConcertData] = useState<ConcertData | null>(null);
  const { id } = useParams();
  const { openModal } = useModalStore(['openModal']);
  const { control, setValue } = useFormContext<SeatReviewSchemaType>();

  const filterByHallCode = (concertData: ConcertData) => {
    return concertData.hallId === id;
  };

  return (
    <ConcertInfoContainer>
      <FormFieldContainer>
        <FormFieldLabel>
          어떤 콘서트를 보셨나요?<Asterisk>*</Asterisk>
        </FormFieldLabel>
        <SearchField
          name="concert"
          onClick={() =>
            openModal(
              'bottomSheet',
              'list',
              <SearchConcertSheet
                filterFn={!isFromMypage ? filterByHallCode : undefined}
                isPastSearch
                onConcertSelect={(concertData: ConcertData) => {
                  setConcertData(concertData);
                  setValue('concertTitle', concertData.title);
                }}
              />
            )
          }
        />
        {concertData && <SearchConcertItem concertData={concertData} isInactive />}
      </FormFieldContainer>

      {concertData && (
        <>
          <FormFieldContainer>
            <FormFieldLabel>
              언제 보셨나요?<Asterisk>*</Asterisk>
            </FormFieldLabel>
            <ConcertDateSelector endDate={concertData.eddate} startDate={concertData.stdate} />
          </FormFieldContainer>

          <FormFieldContainer>
            <FormFieldLabel>
              공연장<Asterisk>*</Asterisk>
            </FormFieldLabel>
            <FormFieldValue>{concertData.concertHallName}</FormFieldValue>
          </FormFieldContainer>

          <FormFieldContainer>
            <FormFieldLabel>
              좌석 정보<Asterisk>*</Asterisk>
            </FormFieldLabel>
            <Controller
              control={control}
              name="seat"
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  isError={!!fieldState.error}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={SEAT_REVIEW_PLACEHOLDER.seatName}
                  type="text"
                />
              )}
            />
          </FormFieldContainer>

          <FormFieldContainer>
            <FormFieldLabel>
              자세한 후기<Asterisk>*</Asterisk>
            </FormFieldLabel>
            <TextAreaContainer>
              <Controller
                control={control}
                name="content"
                render={({ field, fieldState }) => (
                  <TextAreaField
                    {...field}
                    isError={!!fieldState.error}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder={SEAT_REVIEW_PLACEHOLDER.content}
                  />
                )}
              />
            </TextAreaContainer>
          </FormFieldContainer>
        </>
      )}
    </ConcertInfoContainer>
  );
};

export default ReviewForm;
