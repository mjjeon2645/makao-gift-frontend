Feature('Order Histories Page');

Before(({ I }) => {
  I.setupUser();
  I.amOnPage('/');
});

Scenario('로그인하지 않은 고객이 주문 목록을 확인하려고 함', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('주문조회');

  // Then
  I.see('USER LOGIN');
  I.see('로그인하기');
});

Scenario('로그인 한 고객이 주문 목록을 확인할 때(주문내역은 없음)', ({ I }) => {
  // Given
  I.resetOrderHistories();
  I.login();

  // When
  I.click('주문조회');

  // Then
  I.see('내가 주문한 내역이 없습니다');
});

Scenario('로그인 한 고객이 주문 목록을 확인할 때(주문내역 2개)', ({ I }) => {
  // Given
  I.resetOrderHistories();
  I.setupTwoHistories();
  I.login();

  // When
  I.click('주문조회');

  // Then
  I.see('To. 이서진');
  I.see('To. 이상균');
});

Scenario('로그인 한 고객이 주문 세부정보를 확인할 때', ({ I }) => {
  // Given
  I.resetOrderHistories();
  I.setupTwoHistories();
  I.login();

  // When
  I.click('주문조회');
  I.click(locate('button').withText('누구나 좋아하는 지방시 선물세트'));

  // Then
  I.see('구매수량');
  I.see('2022-10-12');
  I.see('서진아 생일축하해~');
});
