import { nanoid } from 'nanoid';
import type { ReactNode } from 'react';
import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

import type { StoreWithShallow } from './utils';
import { useStoreWithShallow } from './utils';

type Toast = {
  id: string;
  content: string;
  icon?: ReactNode;
};

type ToastStore = {
  toast: Toast | null;
  addToast: (content: string, icon?: ReactNode) => void;
};

const toastStore = createWithEqualityFn(
  immer<ToastStore>((set) => ({
    toast: null,
    addToast: (content: string, icon?: ReactNode) => {
      set((state) => {
        // 같은 내용이면 연속 활성화 차단
        if (state.toast?.content === content) return;

        const id = nanoid();
        state.toast = { id, content, icon };

        setTimeout(() => {
          set((state) => {
            if (state.toast?.id === id) {
              state.toast = null;
            }
          });
        }, 3000);
      });
    },
  }))
);

export const useToastStore: StoreWithShallow<ToastStore> = (keys) =>
  useStoreWithShallow(toastStore, keys);
