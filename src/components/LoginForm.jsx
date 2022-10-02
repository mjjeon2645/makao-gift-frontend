import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup');
  };

  return (
    <div>
      <h2>USER LOGIN</h2>
      <form>
        <input id="input-user-id" name="user-id" type="text" placeholder="아이디" />
        <input id="input-password" name="password" type="password" placeholder="비밀번호" />
        <button type="submit">로그인하기</button>
      </form>
      <button type="button" onClick={handleClick}>회원가입</button>
    </div>
  );
}
