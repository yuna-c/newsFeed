import { Link } from 'react-router-dom';
import { HeaderDiv } from '../../styles/layout';

export default function Header() {
  return (
    <HeaderDiv className="Header">
      <nav>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/signin">로그인</Link>
          </li>
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
          <li>
            <Link to="/mypage">마이페이지</Link>
          </li>
          <li>
            <Link to="/detail">Home</Link>
          </li>
          <li>
            <Link to="/write">글쓰기</Link>
          </li>
        </ul>
      </nav>
    </HeaderDiv>
  );
}
