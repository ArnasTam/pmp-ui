import { create } from 'zustand';

export enum UserRole {
  ADMIN = 'ADMIN',
  BASIC = 'BASIC',
}

export interface AuthStoreState {
  accessToken: string;
  role: UserRole;
  setAccessToken: (token: string) => void;
  setRole: (roles: string[]) => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  role: UserRole.BASIC,
  accessToken: '',
  setAccessToken: (token: string) => {
    set({ accessToken: token });
  },
  setRole: (roles: string[]) => {
    set({
      role:
        roles.at(0)?.toLowerCase() === UserRole.ADMIN.toLowerCase()
          ? UserRole.ADMIN
          : UserRole.BASIC,
    });
  },
}));
