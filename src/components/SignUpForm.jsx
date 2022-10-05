/* eslint-disable no-nested-ternary */
import { watch } from 'fs';
import { act } from 'react-dom/test-utils';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useGiftshopStore from '../hooks/useGiftshopStore';

export default function SignUpForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const giftshopStore = useGiftshopStore();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    giftshopStore.signUpState = '';

    const {
      name, userId, password, checkPassword,
    } = data;

    await giftshopStore.signUp(
      {
        name,
        userId,
        password,
        checkPassword,
      },
    );

    if (giftshopStore.isCheckPasswordRight) {
      return;
    }

    if (giftshopStore.isUserIdDuplicated) {
      return;
    }

    navigate('/welcome');
  };

  return (
    <div>
      <h2>SIGN UP</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="input-name">이름 :</label>
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
            <p>{errors.name.message}</p>
          )
            : <p>3~7자까지 한글만 사용 가능</p>}
        </div>
        <div>
          <label htmlFor="input-id">아이디 :</label>
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
          {giftshopStore.isUserIdDuplicated ? (
            <p>{giftshopStore.errorMessage}</p>
          ) : errors.userId ? (
            <p>{errors.userId.message}</p>
          )
            : <p>영문소문자/숫자, 4~16자만 사용 가능</p>}
        </div>
        <div>
          <label htmlFor="input-password">비밀번호 :</label>
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
            <p>{errors.password.message}</p>
          )
            : <p>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</p>}
        </div>
        <div>
          <label htmlFor="input-check-password">비밀번호 확인 :</label>
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
          {giftshopStore.isCheckPasswordRight ? (
            <p>{giftshopStore.errorMessage}</p>)
            : errors.checkPassword ? (
              <p>{errors.checkPassword.message}</p>
            ) : null}
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
