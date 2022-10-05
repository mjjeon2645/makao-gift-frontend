/* eslint-disable no-nested-ternary */
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useGiftshopStore from '../hooks/useGiftshopStore';

export default function LoginForm() {
  const [, setAccessToken] = useLocalStorage('accessToken', '');
  const [, setAmount] = useLocalStorage('amount', 0);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state ? location.state : '';

  const giftshopStore = useGiftshopStore();

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = async (data) => {
    const { userId, password } = data;
    const accessToken = await giftshopStore.login({ userId, password });

    if (accessToken) {
      setAccessToken(accessToken);
      setAmount(giftshopStore.amount);

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
    <div>
      <h2>USER LOGIN</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <p>{errors.userId.message}</p>
        )
          : errors.password ? (
            <p>{errors.password.message}</p>
          )
            : giftshopStore.loginState ? (
              <p>{giftshopStore.errorMessage}</p>
            )
              : null}
        <button type="submit">로그인하기</button>
      </form>
      <button type="button" onClick={handleSignupClick}>회원가입</button>
    </div>
  );
}
