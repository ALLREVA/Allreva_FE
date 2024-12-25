import { devtools } from 'zustand/middleware';
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
};

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  isLoggedIn: false,
  userProfile: null,
  token: null,
};

const authStore = createWithEqualityFn(
  devtools(
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
    }))
  )
);

export const useAuthStore: StoreWithShallow<AuthStore> = (keys) =>
  useStoreWithShallow(authStore, keys);
