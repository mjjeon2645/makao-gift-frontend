/* eslint-disable no-nested-ternary */
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';

// TODO. 에러 시 붉은색으로 input 테두리 만들어야 함

const Wrapper = styled.div`
 width: 25%;
 text-align: center;
 margin-top: 10em;
`;

const Title = styled.h2`
  font-size: 2em;
  font-weight: bold;
  border-bottom: 1px solid #83e8ca;
  margin-bottom: 1.5em;
  padding-bottom: .3em;
`;

const Form = styled.form`
  input {
    display: block;
    width: 100%;
    padding-block: 1em;
    padding-inline: 1em;
    margin-bottom: .7em;
    border: 1px solid #EEEEEE;
  }

  input::placeholder {
     color: #CBCBCB;
   }

  input:focus {
    outline: 1px solid #42deb6;
    }
`;

const Error = styled.p`
  font-size: 0.9em;
  text-align: left;
  color: #ff0000;
  margin-top: 1.5em;
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

const Signup = styled.button`
  margin-top: 3em;
  background: none;
  border: none;
`;

export default function LoginForm() {
  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state ? location.state : '';

  const userStore = useUserStore();

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = async (data) => {
    const { userId, password } = data;
    const accessToken = await userStore.login({ userId, password });
    if (accessToken) {
      setAccessToken(accessToken);

      if (location.state) {
        navigate(`/products/${id}`, { state: { id } });
      }

      if (!location.state) {
        navigate('/');
      }
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <Wrapper>
      <Title>USER LOGIN</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="input-user-id"
          name="user-id"
          placeholder="아이디"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register(
            'userId',
            { required: { value: true, message: '아이디를 입력해주세요' } },
          )}
        />
        <input
          id="input-password"
          name="password"
          type="password"
          placeholder="비밀번호"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register(
            'password',
            { required: { value: true, message: '비밀번호를 입력해주세요' } },
          )}
        />
        {errors.userId ? (
          <Error>{errors.userId.message}</Error>
        )
          : errors.password ? (
            <Error>{errors.password.message}</Error>
          )
            : userStore.loginState ? (
              <Error>{userStore.errorMessage}</Error>
            )
              : ''}
        <Login type="submit">로그인하기</Login>
      </Form>
      <Signup type="button" onClick={handleSignupClick}>회원가입</Signup>
    </Wrapper>
  );
}
