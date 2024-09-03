import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UnauthRoute = ({ children }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      alert('로그인 페이지로 들어갑니다');
    }
  }, [user]);

  if (user) {
    // 로그인된 사용자를 메인 페이지로 리다이렉트
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default UnauthRoute;
