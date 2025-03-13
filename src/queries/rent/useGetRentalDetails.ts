import { useSuspenseQuery } from '@tanstack/react-query';

import { requestGetDepositAccount, requestGetRentalDetails } from 'api';
import { useAuthStore } from 'stores';
import type { AllRentalDetail } from 'types';

const fetchRentalDetails = async (id: string) => {
  const response = await requestGetRentalDetails(id);
  return response.data.result;
};

const fetchDepositAccount = async (id: string) => {
  const { data } = await requestGetDepositAccount(id);
  return data.result.depositAccount;
};

export const useGetRentalDetails = (id: string) => {
  const { isLoggedIn } = useAuthStore(['isLoggedIn']);

  const fetchDetailsWithAuth = async () => {
    const rentalDetails = await fetchRentalDetails(id);
    const depositAccount = isLoggedIn ? await fetchDepositAccount(id) : null;

    return { ...rentalDetails, depositAccount };
  };

  return useSuspenseQuery<AllRentalDetail>({
    queryKey: ['rentalDetail', id],
    queryFn: fetchDetailsWithAuth,
  });
};
