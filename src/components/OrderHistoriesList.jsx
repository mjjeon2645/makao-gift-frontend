import useGiftshopStore from '../hooks/useGiftshopStore';

export default function OrderHistoriesList() {
  const giftshopStore = useGiftshopStore();

  const handleClick = () => {
    //
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
                <button type="button" onClick={handleClick}>
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
