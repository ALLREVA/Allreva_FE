import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createRefundAccount } from 'api';
import type { BankAccount } from 'types';

interface UseRefundAccountProps {
  onSuccess?: () => void;
}

export const useRefundAccount = ({ onSuccess }: UseRefundAccountProps = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createRefundAccount,
    onMutate: async (newAccount) => {
      await queryClient.cancelQueries({ queryKey: ['userInfo'] });

      const previousUserInfo = queryClient.getQueryData(['userInfo']);

      queryClient.setQueryData(['userInfo'], (old: BankAccount) => ({
        ...old,
        bank: newAccount.bank,
        number: newAccount.number,
      }));

      return { previousUserInfo };
    },
    onError: (err, newAccount, context) => {
      queryClient.setQueryData(['userInfo'], context?.previousUserInfo);
      console.error('계좌 정보 업데이트 실패', err);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      onSuccess?.();
    },
  });

  return mutation;
};
