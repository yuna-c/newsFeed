import { Link } from 'react-router-dom';
import { NavDiv } from '../../styles/layout';

export default function Nav() {
  return (
    <NavDiv className="Nav">
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
    </NavDiv>
  );
}
