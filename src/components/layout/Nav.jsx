import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { NavDiv } from '../../styles/layout';

const Nav = () => {
  const { user, signOut } = useAuth();
  let navigate = useNavigate();

  const handleSignout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="Nav">
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/mypage">마이페이지</Link>
            </li>
            <li>
              <Link to="/write">글쓰기</Link>
            </li>
            <li>
              <Link to="/" onClick={handleSignout}>
                로그아웃
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Nav;
