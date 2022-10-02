Feature('Login Page');

Scenario('고객이 로그인 하기 위해 웹사이트에 접속', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  // Then
  I.see('USER LOGIN');
  I.seeElement({ name: 'user-id' });
  I.seeElement({ name: 'password' });
  I.see('로그인하기');
  I.see('회원가입');
});

// Scenario('고객이 로그인에 성공', ({ I }) => {
//   // Given
//   I.amOnPage('/login');

//   // TODO. 로그인할 고객의 정보 사전 세팅

//   // When
//   I.fillField('user-id', 'mjjeon2645');
//   I.fillField('password', secret('123!@#qweQWE'));
//   I.click('로그인하기');

//   // Then
//   I.amOnPage('/');
//   I.see('내 잔액: 50,000원');
//   I.see('로그아웃');
//   I.dontSee('로그인');
//   I.dontSee('회원가입');
// });

// Scenario('고객이 아이디와 비밀번호 중 하나 이상을 틀려 로그인에 실패', ({ I }) => {
//   // Given
//   I.amOnPage('/login');

//   // TODO. 로그인할 고객의 정보 사전 세팅

//   // When
//   I.fillField('user-id', 'mjjeon2645');
//   I.fillField('password', secret('123!@#qweQWE!'));
//   I.click('로그인하기');

//   // Then
//   I.see('아이디 혹은 비밀번호가 맞지 않습니다');
// });

// Scenario('고객이 아이디를 누락하여 로그인에 실패', ({ I }) => {
//   // Given
//   I.amOnPage('/login');

//   // TODO. 로그인할 고객의 정보 사전 세팅

//   // When
//   I.fillField('password', secret('123!@#qweQWE'));
//   I.click('로그인하기');

//   // Then
//   I.see('아이디를 입력해주세요');
// });

// Scenario('고객이 비밀번호를 누락하여 로그인에 실패', ({ I }) => {
//   // Given
//   I.amOnPage('/login');

//   // TODO. 로그인할 고객의 정보 사전 세팅

//   // When
//   I.fillField('user-id', 'mjjeon2645');
//   I.click('로그인하기');

//   // Then
//   I.see('비밀번호를 입력해주세요');
// });
