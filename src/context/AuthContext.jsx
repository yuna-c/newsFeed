import { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../api/supabase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserSession = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error);
      } else {
        // console.log('Session:', session)
        setUser(session?.user ?? null);
      }

      setLoading(false);
    };

    getUserSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      // console.log('Auth state changed:', event, session)
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      listener?.unsubscribe?.();
    };
  }, []);

  const value = {
    signUp: async (data) => {
      const { user, error } = await supabase.auth.signUp(data);

      if (error) {
        console.error('Signup error:', error);
        return { error };
      }

      alert('회원가입 되었습니다. 로그인 페이지로 이동합니다.');

      return { user };
    },
    signIn: async (data) => {
      const { error } = await supabase.auth.signInWithPassword(data);

      if (error) {
        console.error('Signin error:', error);
        return { error };
      }

      alert('로그인 되었습니다.');
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Signout error:', error);
        return { error };
      }

      alert('로그아웃 되었습니다.');
      setUser(null);
    },
    user
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
