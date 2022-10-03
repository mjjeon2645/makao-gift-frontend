import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';
import numberFormat from '../utils/numberFormat';

export default function Header() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
  const [, setAmount] = useLocalStorage('amount', '');

  // TODO. 이렇게 해서 amount가 자동으로 갱신되느냐? useEffect 필요하지 않나?
  // 우선 useUserStrore 안에서 처리됐으므로 기다려보기
  // 위치가 헤더가 맞는지 고민스럽다.
  const userStore = useUserStore();

  const navigate = useNavigate();

  console.log(useUserStore);

  const handleLogout = () => {
    setAccessToken('');
    setAmount(userStore.amount);
    navigate('/');
  };

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
      {!accessToken ? (
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
      ) : (
        <div>
          <ul>
            <li>
              내 잔액&#58;
              {' '}
              {numberFormat(userStore.amount)}
              원
            </li>
            <li>
              <button type="button" onClick={handleLogout}>로그아웃</button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
