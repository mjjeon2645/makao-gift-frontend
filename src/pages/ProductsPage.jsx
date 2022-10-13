import { useEffect } from 'react';
import ProductsBanner from '../components/ProductsBanner';
import ProductsList from '../components/ProductsList';
import useOrderStore from '../hooks/useOrderStore';
import useProductStore from '../hooks/useProductStore';

export default function ProductsPage() {
  const orderStore = useOrderStore();
  const productStore = useProductStore();

  useEffect(() => {
    orderStore.clearOrderState();
    productStore.fetchProducts();
  }, []);

  return (
    <div>
      <ProductsBanner />
      <ProductsList />
    </div>
  );
}
