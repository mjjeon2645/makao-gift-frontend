import { useNavigate } from 'react-router-dom';
import useProductStore from '../hooks/useProductStore';

export default function OrderHistoriesList() {
  const productStore = useProductStore();
  const navigate = useNavigate();

  const { orderHistories, historiesTotalPageNumbers } = productStore;

  const handleHistoryClick = (id) => {
    navigate(`/orders/${id}`, { state: { id } });
  };

  const handlePageNumberClick = (number) => {
    productStore.changeHistoriesPageNumber(number);
    navigate(`/orders?page=${number}`);
  };

  return (
    <div>
      {orderHistories.length === 0 ? (
        <h2>내가 주문한 내역이 없습니다</h2>
      ) : (
        <>
          <div>
            <h2>내가 주문한 내역입니다</h2>
            <ul>
              {orderHistories.map((orderHistory) => (
                <li key={orderHistory.id}>
                  <button type="button" onClick={() => handleHistoryClick(orderHistory.id)}>
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
          <div>
            <ul>
              {historiesTotalPageNumbers.map((number) => (
                <li key={number}>
                  <button type="button" onClick={() => handlePageNumberClick(number)}>
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
