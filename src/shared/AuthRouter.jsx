// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const AuthRoute = ({ children }) => {
//   const { user } = useAuth();

//   if (!user) {
//     alert('여기는 로그아웃 되어 있으면 접속 불가');
//     return <Navigate to="/signin" replace />; // 로그인되지 않은 사용자를 로그인 페이지로 리다이렉트
//   }

//   return children ? children : <Outlet />;
// };
// export default AuthRoute;

import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthRoute = ({ children }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      alert('여기는 로그아웃 되어 있으면 접속 불가');
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/signin" replace />; // 로그인되지 않은 사용자를 로그인 페이지로 리다이렉트
  }

  return children ? children : <Outlet />;
};

export default AuthRoute;
