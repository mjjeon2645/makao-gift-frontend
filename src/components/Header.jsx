import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
import styled from 'styled-components';
import numberFormat from '../utils/numberFormat';
import useUserStore from '../hooks/useUserStore';
import useProductStore from '../hooks/useProductStore';

const Container = styled.header`
  border-bottom: 1px solid #D9D9D9;
  height: 4em;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-inline: calc((100% - 900px) / 2);
  height: 100%;
`;

const MainMenu = styled.nav`
  display: flex;
  height: 100%;
`;

const List = styled.ul`
  display: flex;
  align-items: center;

  li {
    font-weight: bold;
    padding-right: 2.5em;
  }
`;

const SideMenu = styled.nav`
  display: flex;
  align-items: center;
  
`;

const Title = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  font-size: 1em;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
`;

export default function Header() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
  const navigate = useNavigate();
  const userStore = useUserStore();
  const productStore = useProductStore();

  useEffect(() => {
    if (accessToken) {
      userStore.fetchBalance();
    }
  }, []);

  const handleLogout = () => {
    setAccessToken('');
    userStore.clearState();
    productStore.clearState();
    navigate('/');
  };

  return (
    <Container>
      <Wrapper>
        <MainMenu>
          <List>
            <li>
              <Title>선물하기</Title>
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
              <li>
                <Link to="/login">주문조회</Link>
              </li>
            )}
          </List>
        </MainMenu>
        {!accessToken ? (
          <SideMenu>
            <List>
              <li>
                <Link to="/signup">회원가입</Link>
              </li>
              <li>
                <Link to="/login">로그인</Link>
              </li>
            </List>
          </SideMenu>
        ) : (
          <SideMenu>
            <List>
              <li>
                내 잔액:
                {' '}
                {numberFormat(userStore.amount)}
                원
              </li>
              <li>
                <LogoutButton type="button" onClick={handleLogout}>로그아웃</LogoutButton>
              </li>
            </List>
          </SideMenu>
        )}
      </Wrapper>
    </Container>
  );
}
