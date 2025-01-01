import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

import type { StoreWithShallow } from './utils';
import { useStoreWithShallow } from './utils';

import type {
  ConcertData,
  FormAdditionalInfo,
  FormDetailInfo,
  FormDrivingInfo,
  RentalFormData,
} from 'types';

interface RentalFormStore {
  concertData: ConcertData | null;
  formData: RentalFormData;
  updateConcertData: (value: ConcertData) => void;
  updateFormData: <K extends keyof RentalFormData>(key: K, value: RentalFormData[K]) => void;
}

export const initDetailInfo: FormDetailInfo = {
  imageUrl: '',
  title: '',
  region: null,
  depositAccount: '',
  concertId: 0,
  artistName: '',
};

export const initDrivingInfo: FormDrivingInfo = {
  boardingArea: '',
  upTime: '',
  downTime: '',
  rentBoardingDateRequests: [],
  busSize: null,
  busType: null,
  maxPassenger: 0,
  roundPrice: 0,
  upTimePrice: 0,
  downTimePrice: 0,
};

export const initAdditionalInfo: FormAdditionalInfo = {
  recruitmentCount: 0,
  endDate: '',
  chatUrl: '',
  refundType: null,
  information: '',
};

const initFormData: RentalFormData = {
  ...initDetailInfo,
  ...initDrivingInfo,
  ...initAdditionalInfo,
};

const rentalFormStore = createWithEqualityFn(
  persist(
    immer<RentalFormStore>((set) => ({
      concertData: null,
      formData: initFormData,
      updateConcertData: (value) => {
        set((state) => {
          state.concertData = value;
        });
      },
      updateFormData: (key, value) => {
        set((state) => {
          state.formData[key] = value;
        });
      },
    })),
    {
      name: 'rental-form',
      partialize: (state) => ({
        concertData: state.concertData,
        formData: state.formData,
      }),
    }
  )
);

export const useRentalFormStore: StoreWithShallow<RentalFormStore> = (keys) =>
  useStoreWithShallow(rentalFormStore, keys);
