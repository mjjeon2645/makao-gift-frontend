import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductsBanner from '../components/ProductsBanner';
import ProductsList from '../components/ProductsList';
import useOrderStore from '../hooks/useOrderStore';
import useProductStore from '../hooks/useProductStore';

export default function ProductsPage() {
  const orderStore = useOrderStore();
  const productStore = useProductStore();

  console.log(window.location.href);
  console.log('!!!!!!!!!!!!!!');

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
