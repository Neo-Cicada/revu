export type UserProfile = {
    id: string;
    email: string;
    fullName: string | null;
    avatarUrl: string | null;
    subscriptionTier: 'free' | 'pro' | 'premium';
    subscriptionStatus: 'active' | 'trialing' | 'past_due' | 'canceled' | null;
    createdAt: string;
  };
  
  export type AuthUser = {
    id: string;
    email: string;
  };
  
  export type Session = {
    user: AuthUser | null;
    profile: UserProfile | null;
  };