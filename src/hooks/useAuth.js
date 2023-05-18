import { useContext } from 'react';
import { AuthContext } from '../components/HOCs/AuthProvider';

export function useAuth() {
  return useContext(AuthContext);
}
