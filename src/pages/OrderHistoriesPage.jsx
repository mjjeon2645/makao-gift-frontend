import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderHistoriesList from '../components/OrderHistoriesList';
import useOrderHistoryStore from '../hooks/useOrderHistoryStore';

export default function OrderHistoriesPage() {
  const orderHistoryStore = useOrderHistoryStore();

  const navigate = useNavigate();

  useEffect(() => {
    orderHistoryStore.fetchOrderHistories();
  }, []);

  const { orderHistories, historiesTotalPageNumbers } = orderHistoryStore;

  const handleHistoryClick = (id) => {
    navigate(`/orders/${id}`, { state: { id } });
  };

  const handlePageNumberClick = (number) => {
    orderHistoryStore.changeHistoriesPageNumber(number);
    navigate(`/orders?page=${number}`);
  };

  return (
    <OrderHistoriesList
      handleHistoryClick={handleHistoryClick}
      handlePageNumberClick={handlePageNumberClick}
      orderHistories={orderHistories}
      historiesTotalPageNumbers={historiesTotalPageNumbers}
    />
  );
}
