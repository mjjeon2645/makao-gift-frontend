Feature('Products Page');

Scenario('고객이 상품 목록을 확인하기 위해 스토어 화면에 접속하고자 함(로그인 X, 상품 없음)', ({ I }) => {
  // Given
  I.resetProducts();
  I.amOnPage('/');

  // When
  I.click('스토어');

  // Then
  I.see('상품이 존재하지 않습니다');
});

Scenario('고객이 상품목록을 확인하기 위해 스토어 화면에 접속하고자 함(로그인 X, 상품 3개 있음)', ({ I }) => {
  // Given
  I.setupThreeProducts();
  I.amOnPage('/');

  // When
  I.click('스토어');

  // Then
  I.see('인기선물을 한 자리에 모았어요');
  I.see('누구나 좋아하는 지방시 선물세트', 'button[type="button"]');
  I.see('새로나온 아이폰 14', 'button[type="button"]');
  I.see('상주농협', 'button[type="button"]');
});

// Scenario('고객이 상품목록 확인 중 로그인을 함)', ({ I }) => {
//   // Given
//   I.amOnPage('/products');

//   // TODO. 고객의 계정이 사전에 준비되어야 함(id: mjjeon2645, pw: 123!@#qweQWE)
//   // TODO. 업로드 된 상품은 총 25개(..너무 많은가..)

//   // When
//   I.click('로그인');
//   // I.amOnPage('/login'); => 이거 들어가야 하나?
//   I.fillField('user-id', 'mjjeon2645');
//   I.fillField('password', secret('123!@#qweQWE'));

//   // Then
//   I.see('내 잔액: 50,000원');
//   I.see('로그아웃');
//   I.dontSee('로그인');
// });
