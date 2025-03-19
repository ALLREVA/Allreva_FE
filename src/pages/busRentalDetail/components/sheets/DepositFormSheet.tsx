import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { LuCircleAlert } from 'react-icons/lu';
import { useParams } from 'react-router-dom';

import DepositDialog from './DepositDialog';
import DepositInputField from '../items/DepositInputField';
import BoardingDateRadio from '../lists/BoardingDateRadio';
import BoardingTypeRadio from '../lists/BoardingTypeRadio';
import RefundTypeRadio from '../lists/RefundTypeRadio';

import BottomSheet from 'components/bottomSheet/BottomSheet';
import BaseButton from 'components/buttons/BaseButton';
import Counter from 'components/counter/Counter';
import RentalFormField from 'pages/openBusRental/components/sections/RentalFormField';
import type { DepositFormSchemaType } from 'schemas';
import { depoistForminitValues, depositFormSchema } from 'schemas';
import { useModalStore } from 'stores';
import { BodyRegularText } from 'styles/Typography';
import type { BoardingDates, BoardingType, BankAccount } from 'types';
import { BOARDING_TYPE, REFUND_TYPE, type RefundType } from 'types';
import { formatISODate } from 'utils';

interface DepositFormSheetProps {
  boardingDates: BoardingDates[];
  refundOption: RefundType;
  refundAccount?: BankAccount;
}

const AlertMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2.4rem;
  color: ${({ theme }) => theme.colors.red};
`;

const DepositForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  position: relative;
  padding-bottom: 6.4rem;
`;

const InputDescription = styled(BodyRegularText)`
  color: ${({ theme }) => theme.colors.dark[300]};
`;

const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.6rem 2.4rem;
  background-color: ${({ theme }) => theme.colors.dark[700]};
`;

const DepositFormSheet = ({
  boardingDates,
  refundOption,
  refundAccount,
}: DepositFormSheetProps) => {
  const { id } = useParams();
  const { openModal } = useModalStore(['openModal']);

  const methods = useForm<DepositFormSchemaType>({
    resolver: zodResolver(depositFormSchema),
    defaultValues: {
      ...depoistForminitValues,
      refundAccount: refundAccount?.bank ? `${refundAccount?.bank} ${refundAccount?.number}` : '',
    },
  });

  const { handleSubmit, watch, control } = methods;
  const refundType = watch('refundType');

  const convertData = (depositFormData: DepositFormSchemaType) => {
    const { boardingDate, boardingType, refundType, ...restValues } = depositFormData;

    const newBoardingDate = formatISODate(boardingDate);
    const newBoardingType =
      (Object.keys(BOARDING_TYPE) as BoardingType[]).find(
        (key) => BOARDING_TYPE[key] === boardingType
      ) || null;
    const newRefundType =
      (Object.keys(REFUND_TYPE) as RefundType[]).find((key) => REFUND_TYPE[key] === refundType) ||
      null;

    return {
      rentId: Number(id),
      boardingDate: newBoardingDate,
      boardingType: newBoardingType,
      refundType: newRefundType,
      ...restValues,
    };
  };

  const onSubmit = (formData: DepositFormSchemaType) => {
    const convertedFormData = convertData(formData);
    openModal('dialog', 'confirm', <DepositDialog formData={convertedFormData} />);
  };

  const allApplied = useMemo(
    () => boardingDates.every((boardingDate) => boardingDate.isApplied === true),
    [boardingDates]
  );

  return (
    <BottomSheet name="list">
      <BottomSheet.Content>
        <AlertMessage>
          <LuCircleAlert size={20} />
          <BodyRegularText>입금 후에 폼을 작성해주세요!</BodyRegularText>
        </AlertMessage>
        <FormProvider {...methods}>
          <DepositForm onSubmit={handleSubmit(onSubmit)}>
            <RentalFormField>
              <RentalFormField.Title title="입금자명" />
              <DepositInputField name="depositorName" />
            </RentalFormField>
            <RentalFormField>
              <RentalFormField.Title title="입금시각" />
              <DepositInputField name="depositorTime" pattern="##:##" />
            </RentalFormField>
            <RentalFormField>
              <RentalFormField.Title title="전화번호" />
              <DepositInputField name="phone" pattern="###-####-####" />
            </RentalFormField>
            <RentalFormField isHorizontal>
              <RentalFormField.Title title="탑승 인원(본인 포함)" />
              <Controller
                control={control}
                name="passengerNum"
                render={({ field }) => (
                  <Counter
                    {...field}
                    maxCount={10}
                    minCount={1}
                    onChange={(value) => field.onChange(value)}
                    value={Number(field.value) || 1}
                  />
                )}
              />
            </RentalFormField>
            <RentalFormField>
              <RentalFormField.Title title="이용 날짜" />
              <BoardingDateRadio boardingDates={boardingDates} />
            </RentalFormField>
            <RentalFormField>
              <RentalFormField.Title title="이용 편도" />
              <BoardingTypeRadio />
            </RentalFormField>
            <RentalFormField>
              <RentalFormField.Title title="인원 미달 시 희망 옵션" />
              <RefundTypeRadio refundOption={refundOption} />
              {refundType === '환불' && (
                <>
                  <InputDescription>환불 계좌 입력</InputDescription>
                  <DepositInputField name="refundAccount" />
                </>
              )}
            </RentalFormField>
            <BottomButtonWrapper>
              <BaseButton
                color="primary"
                isDisabled={allApplied}
                size="medium"
                type="submit"
                variant="fill"
              >
                제출
              </BaseButton>
            </BottomButtonWrapper>
          </DepositForm>
        </FormProvider>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default DepositFormSheet;
