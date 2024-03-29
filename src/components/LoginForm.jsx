/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */

import styled from 'styled-components';

import useUserStore from '../hooks/useUserStore';

const Wrapper = styled.div`
 width: 100%;
 text-align: center;
 padding-inline: calc((100% - 400px) / 2);
 margin-top: 10em;
`;

const Title = styled.h2`
  font-size: 2em;
  font-weight: bold;
  border-bottom: 1px solid #83e8ca;
  margin-bottom: 1.5em;
  padding-bottom: .3em;
`;

const Input = styled.input`
    display: block;
    width: 100%;
    padding-block: 1em;
    padding-inline: 1em;
    margin-bottom: .7em;
    border: ${(props) => (props.error ? '1px solid #F00' : '1px solid #EEEEEE')};

    ::placeholder {
      color: #CBCBCB;
    }

    :focus {
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

export default function LoginForm({
  onSubmit, register, handleSubmit, errors, signupClick,
}) {
  const userStore = useUserStore();

  return (
    <Wrapper>
      <Title>USER LOGIN</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="input-user-id"
          name="user-id"
          placeholder="아이디"
          {...register(
            'userId',
            { required: { value: true, message: '아이디를 입력해주세요' } },
          )}
          error={errors.userId}
        />
        <Input
          id="input-password"
          name="password"
          type="password"
          placeholder="비밀번호"
          {...register(
            'password',
            { required: { value: true, message: '비밀번호를 입력해주세요' } },
          )}
          error={errors.password}
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
      </form>
      <Signup type="button" onClick={signupClick}>회원가입</Signup>
    </Wrapper>
  );
}
