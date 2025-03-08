import { User } from '@/types';
import { ValidatedAuthFormData } from '@/validator/authValidator';
import { createContext } from 'react';

export type AuthProviderState = {
  user: User | null;
  loading: boolean,
  login: (loginRequest: ValidatedAuthFormData) => Promise<boolean>;
  register: (registerRequest: ValidatedAuthFormData) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthProviderState | undefined>(undefined);