import { useNavigate } from 'react-router-dom';
import useGiftshopStore from '../hooks/useGiftshopStore';

export default function OrderHistoriesList() {
  const giftshopStore = useGiftshopStore();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/orders/${id}`, { state: { id } });
  };

  return (
    <div>
      {giftshopStore.orderHistories.length === 0 ? (
        <h2>내가 주문한 내역이 없습니다</h2>
      ) : (
        <div>
          <h2>내가 주문한 내역입니다</h2>
          <ul>
            {giftshopStore.orderHistories.map((orderHistory) => (
              <li key={orderHistory.id}>
                <button type="button" onClick={() => handleClick(orderHistory.id)}>
                  <p>{orderHistory.manufacturer}</p>
                  <p>{orderHistory.productName}</p>
                  <strong>
                    To.
                    {' '}
                    {orderHistory.receiver}
                  </strong>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
