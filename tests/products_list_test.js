Feature('Products List Page');

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
  I.see('1', 'button[type="button"]');
  I.dontSee('2', 'button[type="button"]');
});

Scenario('고객이 상품목록 확인 중 로그인을 함)', ({ I }) => {
  // Given
  I.setupUser();
  I.setupEighteenProducts();
  I.amOnPage('/products');

  // When
  I.click('로그인');
  I.fillField({ id: 'input-user-id' }, 'mjjeon2645');
  I.fillField({ id: 'input-password' }, secret('123qweQWE$'));
  I.click('로그인하기');

  // Then
  I.see('내 잔액: 50,000원');
  I.see('로그아웃');
  I.dontSee('로그인');
});
