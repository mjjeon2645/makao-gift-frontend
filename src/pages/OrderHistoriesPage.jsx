import { useEffect } from 'react';
import OrderHistoriesList from '../components/OrderHistoriesList';
import useProductStore from '../hooks/useProductStore';

export default function OrderHistoriesPage() {
  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchOrderHistories();
  }, []);

  return (
    <OrderHistoriesList />
  );
}
