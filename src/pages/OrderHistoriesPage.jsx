import { useEffect } from 'react';
import OrderHistoriesList from '../components/OrderHistoriesList';
import useOrderHistoryStore from '../hooks/useOrderHistoryStore';

export default function OrderHistoriesPage() {
  const orderHistoryStore = useOrderHistoryStore();

  useEffect(() => {
    orderHistoryStore.fetchOrderHistories();
  }, []);

  return (
    <OrderHistoriesList />
  );
}
