import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function UnauthRoute({ children }) {
  const { user } = useAuth();

  // 로그인한 사용자라면 메인 페이지로 리다이렉트
  if (user) {
    alert('자동 로그인 되었습니다. 메인 페이지로 이동합니다.');
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}
