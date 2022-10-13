import { useLocation, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { useLocalStorage } from 'usehooks-ts';

import LoginForm from '../components/LoginForm';

import useUserStore from '../hooks/useUserStore';

export default function LoginPage() {
  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const userStore = useUserStore();

  const navigate = useNavigate();

  const location = useLocation();

  const { id } = location.state ? location.state : '';

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
    <LoginForm
      onSubmit={onSubmit}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      signupClick={handleSignupClick}
    />
  );
}
