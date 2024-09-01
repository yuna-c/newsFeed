import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../api/supabase';

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
        // console.log('Session:', session)
        setUser(session?.user ?? null);
      }

      setLoading(false);
    };

    getUserSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      // console.log('인증상태 변경됨:', event, session)
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
        // alert('로그아웃 완료');
        setUser(null); // 로그아웃 후 사용자 상태를 null로 재설정
      }
    },
    // 구현 미완료
    deleteUser: async () => {
      if (!user) {
        console.error('삭제할 사용자가 없습니다.');
        return;
      }

      try {
        // 백엔드로 삭제 요청 보내기
        const response = await fetch('/api/deleteUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: user.id })
        });

        if (!response.ok) {
          throw new Error('회원탈퇴 요청이 실패했습니다.');
        }

        alert('회원탈퇴 완료');
        setUser(null); // 계정 삭제 후 사용자 상태를 null로 재설정

        // 로그아웃 처리
        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) {
          console.error('로그아웃 오류:', signOutError);
        }
      } catch (error) {
        // 지금 상태
        console.error('회원탈퇴 오류:', error);
      }
    },
    user
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
