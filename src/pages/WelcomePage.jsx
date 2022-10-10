import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  margin-top: 10em;
`;

const Title = styled.h2`
  font-size: 2em;
  font-weight: bold;
  margin-block: .7em;
`;

const Content = styled.p`
  p:first-child {
    margin-bottom: .3em;
  }

  p:last-child {
    margin-bottom: 1.2em;
  }
`;

const Login = styled.button`
  color: ${(props) => props.theme.primaryButton.text};
  background: ${(props) => props.theme.primaryButton.background};
  border: none;
  border-radius: 4px;
  width: 100%;
  padding: 1.2em 2.8em;
  margin-top: 1em;
`;

export default function WelcomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };
  return (
    <Wrapper>
      <Title>회원가입 완료</Title>
      <Content>
        <p>마카오 선물하기 회원가입이 완료되었습니다.</p>
        <p>정상적인 서비스 이용을 위해 로그인을 진행해주세요.</p>
      </Content>
      <Login type="button" onClick={handleClick}>로그인하기</Login>
    </Wrapper>
  );
}
