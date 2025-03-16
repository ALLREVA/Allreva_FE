import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

import type { StoreWithShallow } from './utils';
import { useStoreWithShallow } from './utils';

type UserProfile = {
  email: string;
  nickname: string;
  profileImageUrl: string;
};

type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
  userProfile: UserProfile | null;
};

type AuthActions = {
  setIsLoggedIn: () => void;
  setUserProfile: (profile: UserProfile) => void;
  setToken: (token: string | null) => void;
  clearAuthState: () => void;
};

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  isLoggedIn: false,
  userProfile: null,
  token: null,
};

export const authStore = createWithEqualityFn(
  devtools(
    persist(
      immer<AuthStore>((set) => ({
        ...initialState,
        setIsLoggedIn: () => {
          set((state) => {
            state.isLoggedIn = true;
          });
        },
        setUserProfile: (profile) => {
          set((state) => {
            state.userProfile = profile;
          });
        },
        setToken: (token) => {
          set((state) => {
            state.token = token;
          });
        },
        clearAuthState: () => set(initialState),
      })),
      {
        name: 'user-info',
        partialize: (state) => ({
          userProfile: state.userProfile,
        }),
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export const useAuthStore: StoreWithShallow<AuthStore> = (keys) =>
  useStoreWithShallow(authStore, keys);
