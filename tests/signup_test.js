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

Scenario('고객이 회원가입에 성공', ({ I }) => {
  // Given
  I.resetUser();
  I.amOnPage('/');
  I.click('회원가입');

  // When
  I.fillField('이름 :', '전민지');
  I.fillField('아이디 :', 'angel26457');
  I.fillField('비밀번호 :', '123!@#qweQWE');
  I.fillField('비밀번호 확인 :', '123!@#qweQWE');
  I.click('button[type="submit"]');

  // Then
  I.see('마카오 선물하기 회원가입이 완료되었습니다.');
  I.see('정상적인 서비스 이용을 위해 로그인을 진행해주세요.');
  I.see('로그인하기');

  I.click('로그인하기');
  I.see('USER LOGIN');
});

Scenario('고객이 모든 필드를 누락한 채 회원가입 버튼을 누름', ({ I }) => {
  // Given
  I.amOnPage('/signup');

  // When
  I.click('[type=submit]');

  // Then
  I.see('이름을 입력해주세요');
  I.see('아이디를 입력해주세요');
  I.see('비밀번호를 입력해주세요');
});

Scenario('가입하려는 아이디가 이미 존재하는 경우', ({ I }) => {
  // Given
  I.setupUser();
  I.amOnPage('/');
  I.click('회원가입');

  I.amOnPage('/signup');
  I.fillField('이름 :', '전민지');
  I.fillField('아이디 :', 'mjjeon2645');
  I.fillField('비밀번호 :', '123qweQWE$');
  I.fillField('비밀번호 확인 :', '123qweQWE$');

  // When
  I.click('[type=submit]');

  // Then
  I.see('해당 아이디는 사용할 수 없습니다');
});

Scenario('조건에 맞지 않는 사항을 입력했을 경우', ({ I }) => {
  // Given
  I.amOnPage('/signup');
  I.fillField('이름 :', '정신차려이각박한세상속에서');
  I.fillField('아이디 :', '7777-7777-7777');
  I.fillField('비밀번호 :', '123456678');
  I.fillField('비밀번호 확인 :', '98765432');

  // When
  I.click('[type=submit]');

  // Then
  I.see('이름을 다시 확인해주세요');
  I.see('아이디를 다시 확인해주세요');
  I.see('비밀번호를 다시 확인해주세요');
  I.see('비밀번호가 일치하지 않습니다');
});
