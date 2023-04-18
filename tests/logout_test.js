Feature('Logout Situation');

Scenario('고객은 로그인 상태에서 로그아웃 버튼을 눌러 로그아웃한다', ({ I }) => {
  // Given
  I.setupUser();
  I.amOnPage('/');
  I.click('로그인');
  I.fillField({ id: 'input-user-id' }, 'mjjeon2645');
  I.fillField({ id: 'input-password' }, secret('123qweQWE$'));
  I.click('로그인하기');

  // When
  I.click('로그아웃');

  // Then
  I.see('로그인');
  I.see('회원가입');
  I.dontSee('로그아웃');
});
