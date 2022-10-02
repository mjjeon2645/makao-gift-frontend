Feature('Signup Page');

Scenario('고객이 회원가입을 하기 위해 웹사이트에 접속', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('회원가입');

  // Then
  I.see('SIGN UP');
  I.see('이름 :');
  I.see('3~7자까지 한글만 사용 가능');
  I.see('아이디 :');
  I.see('영문소문자/숫자, 4~16자만 사용 가능');
  I.see('비밀번호 :');
  I.see('8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함');
  I.see('비밀번호 확인 :');
  I.see('회원가입');
});

// Scenario('고객이 회원가입에 성공', ({ I }) => {
//   // Given
//   I.amOnPage('/signup');

//   // When
//   I.fillField('이름 :', '전민지');
//   I.fillField('아이디 :', 'mjjeon2645');
//   I.fillField('비밀번호 :', '123!@#qweQWE');
//   I.fillField('비밀번호 확인: ', '123!@#qweQWE');
//   I.click('[type=submit');

//   // Then
//   I.see('회원가입 완료');
//   I.see(/마카오 선물하기 회원가입이 완료되었습니다./);
//   I.see(/정상적인 서비스 이용을 위해 로그인을 진행해주세요./);
//   I.see('로그인하기');

//   I.click('로그인하기');
//   I.amOnPage('/login');
// });

// TODO. 회원가입에 실패하는 시나리오 테스트 작성 필요
