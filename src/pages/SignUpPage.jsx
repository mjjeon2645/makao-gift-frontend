import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import useUserStore from '../hooks/useUserStore';

export default function SignUpPage() {
  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

  const navigate = useNavigate();

  const userStore = useUserStore();

  const { isUserIdDuplicated, errorMessage } = userStore;

  const onSubmit = async (data) => {
    userStore.signUpState = '';

    const {
      name, userId, password, checkPassword,
    } = data;

    await userStore.signUp({
      name, userId, password, checkPassword,
    });

    if (userStore.isCheckPasswordRight) {
      return;
    }

    if (userStore.isUserIdDuplicated) {
      return;
    }

    navigate('/welcome');
  };

  return (
    <SignUpForm
      register={register}
      watch={watch}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
      isUserIdDuplicated={isUserIdDuplicated}
      errorMessage={errorMessage}
    />
  );
}
