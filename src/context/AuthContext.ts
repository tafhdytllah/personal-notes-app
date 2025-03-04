import { User } from '@/types';
import { createContext } from 'react';

export type AuthProviderState = {
  user: User | null;
  loading: boolean,
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthProviderState | undefined>(undefined);