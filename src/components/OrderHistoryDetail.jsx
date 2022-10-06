import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useGiftshopStore from '../hooks/useGiftshopStore';
import numberFormat from '../utils/numberFormat';

export default function OrderHistoryDetail() {
  const location = useLocation();
  const { id } = location.state;

  const giftshopStore = useGiftshopStore();
  const { orderHistory } = giftshopStore;

  useEffect(() => {
    giftshopStore.fetchOrderHistory(id);
  }, []);

  return (
    <div>
      <p>이미지 영역</p>
      <p>{orderHistory.manufacturer}</p>
      <p>{orderHistory.productName}</p>
      <div>
        <p>구매수량</p>
        <p>{orderHistory.volume}</p>
      </div>
      <div>
        <p>총 상품금액</p>
        <p>
          {numberFormat(orderHistory.totalPrice)}
          원
        </p>
      </div>
      <div>
        <p>구매일</p>
        <p>{orderHistory.orderedDate}</p>
      </div>
      <div>
        <p>받는 분</p>
        <p>{orderHistory.receiver}</p>
      </div>
      <div>
        <p>받는 분 주소</p>
        <p>{orderHistory.address}</p>
      </div>
      <div>
        <p>받는 분께 보내는 메세지</p>
        <p>{orderHistory.message}</p>
      </div>
    </div>
  );
}
