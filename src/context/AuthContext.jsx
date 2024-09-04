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
    // profiles : 이메일/프로필/닉네임 가져오기
    const getUserProfile = async (sessionUser) => {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('email, avatar_url, username')
        .eq('email', sessionUser.email)
        .single();

      if (error || !profile) {
        console.error('프로필 가져오기 오류 또는 프로필이 존재하지 않음:', error);
        setUser(null);
      } else {
        setUser({
          ...sessionUser,
          email: profile.email,
          avatar_url: profile.avatar_url,
          username: profile.username
        });
      }
    };

    // session : 로그인/로그아웃 세션 가져오기
    const getUserSession = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error || !session) {
        console.error('세션 가져오기 오류 또는 세션이 없습니다:', error);
        setUser(null);
      } else if (session.user) {
        await getUserProfile(session.user);
      }
      setLoading(false);
    };

    getUserSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        getUserProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
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
    },

    signOut: async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('로그아웃 오류:', error);
      } else {
        setUser(null);
        console.log('로그아웃');
      }
    },

    user
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
