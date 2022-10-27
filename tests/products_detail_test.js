Feature('Product Detail Page');

Before(({ I }) => {
  I.setupUser();
  I.setupThreeProducts();
  I.amOnPage('/login');
  I.fillField({ id: 'input-user-id' }, 'mjjeon2645');
  I.fillField({ id: 'input-password' }, secret('123qweQWE$'));
  I.click('로그인하기');
});

Scenario('고객이 상품의 세부 정보를 확인하고자 함', ({ I }) => {
  // Given
  I.amOnPage('/products');

  // When
  I.click(locate('button').withText('누구나 좋아하는 지방시 선물세트'));

  // Then
  I.see('지방시 선물세트 누구나 다 좋아합니다');
  I.see('총 상품금액:');
  I.see('선물하기');
});

Scenario('고객이 상품 수량을 변경하고자 함', ({ I }) => {
  // Given
  I.amOnPage('/products');
  I.click(locate('button').withText('누구나 좋아하는 지방시 선물세트'));

  // When
  I.click('button[name="plusblack"]');
  I.click('button[name="plusblack"]');

  // Then
  I.see('3');
});
