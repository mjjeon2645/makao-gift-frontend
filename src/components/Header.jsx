import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <h1>선물하기</h1>
          </li>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/products">스토어</Link>
          </li>
          <li>
            <Link to="/orders">주문조회</Link>
          </li>
        </ul>
      </nav>
      <div>
        <ul>
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            내 잔액: 50,000원
          </li>
          <li>
            <button type="button" onClick={() => {}}>로그아웃</button>
          </li>
        </ul>
      </div>
    </header>
  );
}
