import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthRoute({ children }) {
  const { user } = useAuth();

  // 로그인한 사용자가 아니라면 로그인 페이지로 리다이렉트
  if (!user) {
    alert('로그인되지 않았습니다. 로그인 페이지로 이동합니다.');
    return <Navigate to="/signin" replace />;
  }

  return children ? children : <Outlet />;
}
