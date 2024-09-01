import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UnauthRoute = ({ children }) => {
  const { user } = useAuth();

  // useEffect(() => {
  //   if (user) {
  //     alert('여기는 로그인 되어 있으면 접속 불가');
  //   }
  // }, [user]);

  if (user) {
    return <Navigate to="/" replace />; // 로그인된 사용자를 메인 페이지로 리다이렉트
  }

  return children ? children : <Outlet />;
};

export default UnauthRoute;
