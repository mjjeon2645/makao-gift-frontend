import { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import useUserStore from '../hooks/useUserStore';

export default function LoginPage() {
  const userStore = useUserStore();

  // useEffect(() => {
  //   userStore.cleanUserState();
  // }, []);

  return (
    <LoginForm />
  );
}
