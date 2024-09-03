import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogoContainer, LogoImg, NavContainer } from '../../styles/layout';

import { ColorText } from '../../styles/common';
import logo from '../../assets/images/logo.png';

export default function Nav() {
  const { user, signOut } = useAuth();
  let navigate = useNavigate();

  const handleSignout = async () => {
    await signOut();
    navigate('/');
    // window.location.reload();
  };

  return (
    <>
      <LogoContainer>
        <Link to="/">
          <LogoImg src={logo} alt="Logo" /> 짤 저장소
        </Link>
      </LogoContainer>

      <NavContainer className="Nav">
        <li>
          <Link to="/">전체</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/mypost">작성글</Link>
            </li>
            <li>
              <Link to="/post">글쓰기</Link>
            </li>
            <li>
              <Link to="/mypage">마이페이지</Link>
            </li>
            <li>
              <Link to="/" onClick={handleSignout}>
                로그아웃
              </Link>
            </li>
            <li>
              <ColorText $red>{user?.username || user.email.split('@')[0]}</ColorText> 님 환영합니다
            </li>
          </>
        ) : (
          <>
            {/* <li><Link to="/post">접근제한 테스트</Link></li> */}
            <li>
              <Link to="/signin">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </>
        )}
      </NavContainer>
    </>
  );
}
