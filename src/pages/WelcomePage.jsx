import useUserStore from '../hooks/useUserStore';
import numberFormat from '../utils/numberFormat';

export default function WelcomePage() {
  const userStore = useUserStore();
  return (
    <div>
      <p>
        환영합니다~
        {' '}
        {userStore.name}
        {' '}
        회원님
      </p>
      <p>
        회원님의 아이디는
        {' '}
        {userStore.userId}
        이고
      </p>
      <p>
        현재 잔액은
        {' '}
        {numberFormat(userStore.amount)}
        원 입니다.
      </p>
    </div>
  );
}
