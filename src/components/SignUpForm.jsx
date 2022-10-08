/* eslint-disable no-nested-ternary */
import { watch } from 'fs';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../hooks/useUserStore';

const Wrapper = styled.div`
 width: 25%;
 text-align: center;
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

  input:focus {
    outline: 1px solid #42deb6;
    }
`;

const Field = styled.div`
  margin-bottom: 2em;
`;

const Label = styled.label`
  font-weight: bold;
  color: #A0A0A0;
  display: block;
  text-align: left;
  margin-bottom: .5em;
`;

const Message = styled.p`
  font-size: .9em;
  text-align: left;
  color: #A0A0A0;
`;

const Error = styled.p`
  font-size: 0.9em;
  text-align: left;
  color: #ff0000;
`;

const Signup = styled.button`
  color: ${(props) => props.theme.primaryButton.text};
  background: ${(props) => props.theme.primaryButton.background};
  border: none;
  border-radius: 4px;
  width: 100%;
  padding: 1.2em 2.8em;
  margin-top: 1em;
`;

export default function SignUpForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const userStore = useUserStore();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    userStore.signUpState = '';

    const {
      name, userId, password, checkPassword,
    } = data;

    await userStore.signUp(
      {
        name,
        userId,
        password,
        checkPassword,
      },
    );

    if (userStore.isCheckPasswordRight) {
      return;
    }

    if (userStore.isUserIdDuplicated) {
      return;
    }

    navigate('/welcome');
  };

  return (
    <Wrapper>
      <Title>SIGN UP</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Label htmlFor="input-name">이름 :</Label>
          <input
            id="input-name"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register(
              'name',
              {
                required: { value: true, message: '이름을 입력해주세요' },
                pattern: { value: /^[ㄱ-ㅎ|가-힣]{3,7}$/, message: '이름을 다시 확인해주세요' },
              },
            )}
          />
          {errors.name ? (
            <Error>{errors.name.message}</Error>
          )
            : <Message>3~7자까지 한글만 사용 가능</Message>}
        </Field>
        <Field>
          <Label htmlFor="input-id">아이디 :</Label>
          <input
            id="input-id"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register(
              'userId',
              {
                required: { value: true, message: '아이디를 입력해주세요' },
                pattern: { value: /^[a-z0-9]{4,16}$/, message: '아이디를 다시 확인해주세요' },
              },
            )}
          />
          {userStore.isUserIdDuplicated ? (
            <Error>{userStore.errorMessage}</Error>
          ) : errors.userId ? (
            <Error>{errors.userId.message}</Error>
          )
            : <Message>영문소문자/숫자, 4~16자만 사용 가능</Message>}
        </Field>
        <Field>
          <Label htmlFor="input-password">비밀번호 :</Label>
          <input
            id="input-password"
            type="password"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register(
              'password',
              {
                required: { value: true, message: '비밀번호를 입력해주세요' },
                pattern: {
                  value: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
                  message: '비밀번호를 다시 확인해주세요',
                },
              },
            )}
          />
          {errors.password ? (
            <Error>{errors.password.message}</Error>
          )
            : <Message>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</Message>}
        </Field>
        <Field>
          <Label htmlFor="input-check-password">비밀번호 확인 :</Label>
          <input
            id="input-check-password"
            type="password"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register(
              'checkPassword',
              {
                required: { value: true, message: '비밀번호를 입력해주세요' },
                validated: {
                  value: (value) => value === watch('password'),
                  message: '비밀번호가 일치하지 않습니다',
                },
              },
            )}
          />
          {userStore.isCheckPasswordRight ? (
            <Error>{userStore.errorMessage}</Error>)
            : errors.checkPassword ? (
              <Error>{errors.checkPassword.message}</Error>
            ) : null}
        </Field>
        <Signup type="submit">회원가입</Signup>
      </Form>
    </Wrapper>
  );
}
