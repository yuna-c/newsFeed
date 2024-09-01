import { createContext, useState, useEffect } from 'react';
import supabase from '../api/supabase';

export const UserContext = createContext();

export const UseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TODO: 유저 정보 가져와서 전역상태로 사용하기
    const getSession = async () => {
      try {
        const aaa = await supabase.auth.getSession();
        console.log('aaa => ', aaa);
      } catch (error) {
        console.error('Error fetcing session:'.error);
      }
    };

    getSession();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
