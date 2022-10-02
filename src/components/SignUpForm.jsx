export default function SignUpForm() {
  return (
    <div>
      <h2>SIGN UP</h2>
      <form>
        <div>
          <label htmlFor="input-name">이름 &#58;</label>
          <input id="input-name" type="text" />
          <p>3~7자까지 한글만 사용 가능</p>
        </div>
        <div>
          <label htmlFor="input-id">아이디 &#58;</label>
          <input id="input-id" type="text" />
          <p>영문소문자/숫자, 4~16자만 사용 가능</p>
        </div>
        <div>
          <label htmlFor="input-password">비밀번호 &#58;</label>
          <input id="input-password" type="text" />
          <p>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</p>
        </div>
        <div>
          <label htmlFor="input-check-password">비밀번호 확인 &#58;</label>
          <input id="input-check-password" type="text" />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
