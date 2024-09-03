import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../assets/api/supabase';

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
        console.error('세션 가져오기 오류:', error);
      } else {
        setUser(session?.user ?? null);
      }

      // const currentUser = supabase.auth.user;
      // if (!session && currentUser) {
      //   setUser(currentUser);
      // }

      setLoading(false);
    };

    getUserSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      // console.log('인증상태 변경됨:', event, session)
      setUser(session?.user ?? null);
      // if (session) {
      //   console.log(session.user.email);
      //   console.log(session);
      // }
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
        console.error('회원가입 오류:', error);
        return { error };
      }

      return { user };
    },
    signIn: async (data) => {
      const { error } = await supabase.auth.signInWithPassword(data);

      if (error) {
        console.error('로그인 오류:', error);
        return { error };
      }

      alert('로그인 완료');
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('로그아웃 오류:', error);
      } else {
        setUser(null);
      }
    },

    user
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
