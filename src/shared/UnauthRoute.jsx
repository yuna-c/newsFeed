import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UnauthRoute = ({ children }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      alert('여기는 로그인 하지 않으면 접속 불가');
    }
  }, [user]);

  if (user) {
    // 로그인 하지 않은 사용자를 메인 페이지로 리다이렉트
    return <Navigate to="/signin" replace />;
  }

  return children ? children : <Outlet />;
};

export default UnauthRoute;
