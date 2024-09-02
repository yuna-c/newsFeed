import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogoDiv, NavDiv } from '../../styles/layout';
import { ColorText } from '../../styles/common';

const Nav = () => {
  const { user, signOut } = useAuth();
  let navigate = useNavigate();
  // console.log(user);

  const handleSignout = async () => {
    await signOut();
    navigate('/');
    // window.location.reload();
  };

  return (
    <>
      <LogoDiv>
        <Link to="/">홈 로고</Link>
      </LogoDiv>

      <NavDiv className="Nav">
        <li>
          <Link to="/">전체 글</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/mypage">마이페이지</Link>
            </li>
            <li>
              <Link to="/addpost">글쓰기</Link>
            </li>
            <li>
              <Link to="/detail">detail</Link>
            </li>
            <li>
              <Link to="/" onClick={handleSignout}>
                로그아웃
              </Link>
            </li>
            <li>
              <ColorText $red>{user.email.split('@')[0]}</ColorText> 님 환영합니다
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
      </NavDiv>
    </>
  );
};
export default Nav;
