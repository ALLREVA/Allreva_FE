import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import ReviewForm from './components/ReviewForm';

import Button from 'components/buttons/BaseButton';
import type { SeatReviewSchemaType } from 'schemas/seatReviewSchema';
import { seatReviewSchema } from 'schemas/seatReviewSchema';

interface CreateConcertHallReviewProps {
  type: 'create' | 'edit';
  isFromMypage?: boolean;
}

const CreateConcertHallReview = ({ type, isFromMypage = false }: CreateConcertHallReviewProps) => {
  const { id } = useParams();
  const methods = useForm<SeatReviewSchemaType>({
    resolver: zodResolver(seatReviewSchema),
    defaultValues: {
      viewDate: '',
      concertTitle: '',
      star: 0,
      seat: '',
      content: '',
      hallId: isFromMypage ? '' : id,
      imageUrls: [],
    },
  });

  const {
    formState: { isValid },
    handleSubmit,
  } = methods;

  const onSubmit = (data: SeatReviewSchemaType) => {
    console.log('제출된 데이터:', data);
  };

  return (
    <ReviewContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ReviewForm isFromMypage={isFromMypage} />
          <Button color="primary" isDisabled={!isValid} size="medium" type="submit" variant="fill">
            리뷰 등록
          </Button>
        </form>
      </FormProvider>
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2.4rem;

  & > form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    flex: 1;
  }
`;

export default CreateConcertHallReview;
