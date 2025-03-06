// context/auth-context.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase/supabase';
import { Session, AuthUser, UserProfile } from '@/types/user';
import { useRouter } from 'next/navigation';
import { AuthChangeEvent, Session as SupabaseSession } from '@supabase/supabase-js';

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any | null }>;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch the current session
    const fetchSession = async () => {
      const { data: { session: authSession }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error fetching session:', error);
        setIsLoading(false);
        return;
      }
      
      if (authSession) {
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authSession.user.id)
          .single();
          
        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile:', profileError);
        }
        
        setSession({
          user: authSession.user ? {
            id: authSession.user.id,
            email: authSession.user.email || '',
          } : null,
          profile: profile ? {
            id: profile.id,
            email: profile.email,
            fullName: profile.full_name,
            avatarUrl: profile.avatar_url,
            subscriptionTier: profile.subscription_tier,
            subscriptionStatus: profile.subscription_status,
            createdAt: profile.created_at,
          } : null,
        });
      } else {
        setSession(null);
      }
      
      setIsLoading(false);
    };

    fetchSession();
    
    // Set up auth change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, authSession: SupabaseSession | null) => {
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          if (authSession) {
            // Get user profile
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', authSession.user.id)
              .single();
              
            if (profileError && profileError.code !== 'PGRST116') {
              console.error('Error fetching profile:', profileError);
            }
            
            setSession({
              user: {
                id: authSession.user.id,
                email: authSession.user.email || '',
              },
              profile: profile ? {
                id: profile.id,
                email: profile.email,
                fullName: profile.full_name,
                avatarUrl: profile.avatar_url,
                subscriptionTier: profile.subscription_tier,
                subscriptionStatus: profile.subscription_status,
                createdAt: profile.created_at,
              } : null,
            });
          }
          
          router.refresh();
        } else if (event === 'SIGNED_OUT') {
          setSession(null);
          router.refresh();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const signUp = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName,
        },
      },
    });
    
    if (!error && data.user) {
      // Create a profile for the user
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          full_name: fullName,
          subscription_tier: 'free',
        });
        
      if (profileError) {
        console.error('Error creating profile:', profileError);
      }
    }
    
    setIsLoading(false);
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}