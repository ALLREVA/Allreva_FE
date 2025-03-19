import { useMutation, useQueryClient } from '@tanstack/react-query';

import { requestPostRentalForm } from 'api';
import { useFilterStore } from 'stores';
import type { RentalFormData } from 'types';

export const usePostRentalForm = () => {
  const queryClient = useQueryClient();
  const { rentalFilters } = useFilterStore(['rentalFilters']);

  return useMutation({
    mutationFn: async (rentalFormData: RentalFormData) => {
      await requestPostRentalForm(rentalFormData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['rentalList', rentalFilters] });
    },
    onError: (err) => {
      console.log('폼 전송 오류: ', err);
    },
  });
};
