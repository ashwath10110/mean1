import { User } from "@app/core/auth/user";

export interface AuthState {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
  
  loading: boolean;
  
  isLoaded: boolean;
}