Feature('home');

Scenario('고객이 홈페이지 홈 화면에 접속했을 때', ({ I }) => {
  // When
  I.amOnPage('/');

  // Then
  I.see('무얼 선물할 지 고민이라면');
  I.see('마카오 선물하기에서만 볼 수 있는 특별한 아이템');
});
