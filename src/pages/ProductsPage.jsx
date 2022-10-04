import { useEffect } from 'react';
import ProductsBanner from '../components/ProductsBanner';
import ProductsList from '../components/ProductsList';
import useGiftshopStore from '../hooks/useGiftshopStore';

export default function ProductsPage() {
  const giftshopStore = useGiftshopStore();

  useEffect(() => {
    giftshopStore.fetchProducts();
  }, []);

  return (
    <div>
      <ProductsBanner />
      <ProductsList />
    </div>
  );
}
