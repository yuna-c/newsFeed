import { useAuth } from '../../context/AuthContext';
import { useNavigate, NavLink, Link } from 'react-router-dom';

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
          <NavLink to="/">Home</NavLink>
        </li>
        {user ? (
          <>
            <li className="nav-item">
              <NavLink to="/addpost">글쓰기</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" onClick={handleSignout}>
                로그아웃
              </NavLink>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <Link to="/login">로그인</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Nav;
