import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthRoute = ({ children }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다.');
    }
  }, [user]);

  if (!user) {
    // 로그인하지 않은 사용자를 로그인 페이지로 리다이렉트
    return <Navigate to="/signin" replace />;
  }

  return children ? children : <Outlet />;
};

export default AuthRoute;
