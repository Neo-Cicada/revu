'use client';

import { useAuth } from '@/src/context/auth-context';

export function useAuthentication() {
  const { session, isLoading, signIn, signUp, signOut } = useAuth();
  
  const isAuthenticated = !!session?.user;
  const user = session?.user || null;
  const profile = session?.profile || null;
  
  return {
    isAuthenticated,
    isLoading,
    user,
    profile,
    signIn,
    signUp,
    signOut,
  };
}