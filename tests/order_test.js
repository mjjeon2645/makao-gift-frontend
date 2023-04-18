Feature('Order Page');

Before(({ I }) => {
  I.setupUser();
  I.setupThreeProducts();
  I.amOnPage('/');
});

Scenario('로그인하지 않은 고객이 상품을 주문하려고 함', ({ I }) => {
  // Given
  I.amOnPage('/products');

  // When
  I.click(locate('button').withText('누구나 좋아하는 지방시 선물세트'));
  I.click('선물하기');

  // Then
  I.see('USER LOGIN');
  I.see('로그인하기');
});

Scenario('로그인하지 않은 고객이 상품 주문하기를 눌러 로그인 화면에서 로그인 함', ({ I }) => {
  // Given
  I.amOnPage('/products');
  I.click(locate('button').withText('누구나 좋아하는 지방시 선물세트'));
  I.click('선물하기');

  // When
  I.fillField({ id: 'input-user-id' }, 'mjjeon2645');
  I.fillField({ id: 'input-password' }, secret('123qweQWE$'));
  I.click('로그인하기');

  // Then
  I.see('누구나 좋아하는 지방시 선물세트');
});

Scenario('잔액 부족으로 주문 실패', ({ I }) => {
  // Given
  I.login();
  I.amOnPage('/products');

  // When
  I.click(locate('button').withText('새로나온 아이폰 14'));
  I.click('선물하기');

  // Then
  I.see('❌잔액이 부족하여 선물하기가 불가합니다❌');
});

Scenario('주문 성공', ({ I }) => {
  // Given
  I.resetOrderHistories();
  I.login();
  I.amOnPage('/products');
  I.click(locate('button').withText('누구나 좋아하는 지방시 선물세트'));
  I.click('선물하기');

  // When
  I.fillField({ id: 'input-receiver' }, '이서진');
  I.fillField({ id: 'input-address' }, '서울시 양천구');
  I.fillField({ id: 'input-message' }, '서진아 생일 축하해~');
  I.click('선물하기');

  // Then
  I.see('내가 주문한 내역입니다');
  // TODO. 특정할 수 있는 버튼을 select할 수 있도록 하자.
});

Scenario('주문하기 폼에 있는 필드 누락', ({ I }) => {
  // Given
  I.login();
  I.amOnPage('/products');
  I.click(locate('button').withText('누구나 좋아하는 지방시 선물세트'));
  I.click('선물하기');

  // When
  I.fillField({ id: 'input-receiver' }, '');
  I.fillField({ id: 'input-address' }, '');
  I.fillField({ id: 'input-message' }, '');
  I.click('선물하기');

  // Then
  I.see('성함을 입력해주세요');
  I.see('주소를 입력해주세요');
});
