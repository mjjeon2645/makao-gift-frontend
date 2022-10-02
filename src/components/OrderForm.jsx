export default function OrderForm() {
  return (
    <div>
      <div>
        <p>제조사</p>
        <p>상품명</p>
        <p>구매수량&#58; 1</p>
        <p>총 상품금액&#58; 10,000원</p>
      </div>
      <form>
        <div>
          <label htmlFor="input-name">받는 분 성함</label>
          <input id="input-name" type="text" />
          <p>3~7자까지 한글만 사용 가능</p>
        </div>
        <div>
          <label htmlFor="input-address">받는 분 주소</label>
          <input id="input-address" type="text" />
          <p>주소지를 입력해주세요</p>
        </div>
        <div>
          <label htmlFor="input-message">받는 분께 보내는 메세지</label>
          <textarea id="input-message" type="text" />
          <p>100글자 이내로 입력해주세요</p>
        </div>
        <button type="submit">선물하기</button>
      </form>
    </div>
  );
}
