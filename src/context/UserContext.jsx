import { createContext, useState, useEffect } from 'react';
import supabase from '../api/supabase';

// Context 생성
export const UserContext = createContext();

// UserProvider 컴포넌트
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    // 인증 상태 변경 구독
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    // 컴포넌트가 언마운트될 때 구독 해제
    return () => subscription?.unsubscribe();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
