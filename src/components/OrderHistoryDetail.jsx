import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/numberFormat';

// TODO. 여기에다가 '뒤로가기' 버튼 주는게 어떨까?
export default function OrderHistoryDetail() {
  const location = useLocation();
  const { id } = location.state;

  const productStore = useProductStore();
  const { orderHistory } = productStore;

  useEffect(() => {
    productStore.fetchOrderHistory(id);
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
