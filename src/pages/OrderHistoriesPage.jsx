import { useEffect } from 'react';
import OrderHistoriesList from '../components/OrderHistoriesList';
import useGiftshopStore from '../hooks/useGiftshopStore';

export default function OrderHistoriesPage() {
  const giftshopStore = useGiftshopStore();

  useEffect(() => {
    giftshopStore.fetchOrderHistories();
  }, []);

  return (
    <OrderHistoriesList />
  );
}
