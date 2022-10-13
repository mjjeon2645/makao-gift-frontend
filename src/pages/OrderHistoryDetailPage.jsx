import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import useOrderHistoryStore from '../hooks/useOrderHistoryStore';

import OrderHistoryDetail from '../components/OrderHistoryDetail';

export default function OrderHistoryDetailPage() {
  const location = useLocation();
  const { id } = location.state;

  const orderHistoryStore = useOrderHistoryStore();
  const { orderHistory } = orderHistoryStore;

  const navigate = useNavigate();

  useEffect(() => {
    orderHistoryStore.fetchOrderHistory(id);
  }, []);

  const handleOrderHistoriesClick = () => {
    navigate('/orders');
  };

  return (
    <OrderHistoryDetail
      handleOrderHistoriesClick={handleOrderHistoriesClick}
      orderHistory={orderHistory}
    />
  );
}
