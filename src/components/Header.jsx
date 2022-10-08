import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import numberFormat from '../utils/numberFormat';
import useUserStore from '../hooks/useUserStore';
import useProductStore from '../hooks/useProductStore';

export default function Header({ amount }) {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
  // TODO. 이렇게 해서 amount가 자동으로 갱신되느냐? useEffect 필요하지 않나?
  // 우선 useUserStrore 안에서 처리됐으므로 기다려보기
  // 위치가 헤더가 맞는지 고민스럽다.
  // 액세스토큰 여부에 따라 회원가입 link를 다르게 줬는데 근원해결책은 아닌듯. 더 고민해보자.

  const navigate = useNavigate();
  const userStore = useUserStore();
  const productStore = useProductStore();

  const handleLogout = () => {
    setAccessToken('');
    userStore.clearState();
    productStore.clearState();
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
          {accessToken ? (
            <li>
              <Link to="/orders">주문조회</Link>
            </li>
          ) : (
            <Link to="/login">주문조회</Link>
          )}
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
              내 잔액:
              {' '}
              {numberFormat(amount)}
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
