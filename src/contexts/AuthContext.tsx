
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  phone?: string;
  company?: string;
  role: 'user' | 'admin' | 'vip';
  membership_tier: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updateProfile: (updates: any) => Promise<{ error: any }>;
  isAdmin: boolean;
  isVIP: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      // Get profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') {
        if (import.meta.env.DEV) {
          console.error('Error fetching profile:', profileError);
        }
        return null;
      }

      // Get user role from the secure user_roles table
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .order('role', { ascending: true })
        .limit(1)
        .single();

      const userRole = roleData?.role || 'user';
      
      return {
        ...profileData,
        role: userRole
      } as Profile;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error in fetchProfile:', error);
      }
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (import.meta.env.DEV) {
          console.log('Auth state changed:', event);
        }
        setSession(session);
        setUser(session?.user ?? null);

        // Fetch profile data when user signs in
        if (session?.user) {
          setTimeout(async () => {
            const profileData = await fetchProfile(session.user.id);
            setProfile(profileData);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);

        // Handle auth events
        if (event === 'SIGNED_IN') {
          toast.success('Successfully signed in!');
        } else if (event === 'SIGNED_OUT') {
          toast.success('Successfully signed out!');
        } else if (event === 'PASSWORD_RECOVERY') {
          toast.success('Check your email for password reset instructions');
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (import.meta.env.DEV) {
        console.log('Initial session established');
      }
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(async () => {
          const profileData = await fetchProfile(session.user.id);
          setProfile(profileData);
        }, 0);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        if (import.meta.env.DEV) {
          console.error('Sign in error:', error);
        }
        toast.error(error.message);
      }
      
      return { error };
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Unexpected sign in error:', err);
      }
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: metadata || {}
        }
      });
      
      if (error) {
        if (import.meta.env.DEV) {
          console.error('Sign up error:', error);
        }
        toast.error(error.message);
      } else {
        toast.success('Account created! Please check your email to verify your account.');
      }
      
      return { error };
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Unexpected sign up error:', err);
      }
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        if (import.meta.env.DEV) {
          console.error('Sign out error:', error);
        }
        toast.error('Error signing out');
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Unexpected sign out error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Check your email for password reset instructions');
      }
      
      return { error };
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Password reset error:', err);
      }
      return { error: err };
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: updates
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Profile updated successfully');
      }
      
      return { error };
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Profile update error:', err);
      }
      return { error: err };
    }
  };

  const isAdmin = profile?.role === 'admin';
  const isVIP = profile?.role === 'vip' || profile?.role === 'admin';

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    isAdmin,
    isVIP,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
