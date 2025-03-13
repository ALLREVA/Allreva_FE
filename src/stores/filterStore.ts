import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

import type { StoreWithShallow } from './utils';
import { useStoreWithShallow } from './utils';

import type { Filters } from 'types';

const DEFAULT_REGION = '지역';
const DEFAULT_SORT = '최신순';

export type FilterState = {
  rentalFilters: Filters;
  surveyFilters: Filters;
};

type FilterActions = {
  updateFilter: (
    category: keyof FilterState,
    filterKey: keyof Filters,
    value: string,
    isActive?: boolean
  ) => void;
};

type FilterStore = FilterState & FilterActions;

const createInitialFilters = (): Filters => ({
  region: { value: DEFAULT_REGION, isActive: false },
  sort: { value: DEFAULT_SORT, isActive: false },
});

const initialState: FilterState = {
  rentalFilters: createInitialFilters(),
  surveyFilters: createInitialFilters(),
};

const filterStore = createWithEqualityFn(
  devtools(
    immer<FilterStore>((set) => ({
      ...initialState,
      updateFilter: (category, filterKey, value, isActive = true) => {
        set((state) => {
          state[category][filterKey] = {
            value,
            isActive,
          };
        });
      },
    })),
    {
      name: 'Filter Store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);

export const useFilterStore: StoreWithShallow<FilterStore> = <K extends keyof FilterStore>(
  keys: K[],
  withEqualityFn = true
): Pick<FilterStore, K> => useStoreWithShallow(filterStore, keys, withEqualityFn);
