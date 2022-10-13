import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductsBanner from '../components/ProductsBanner';
import ProductsList from '../components/ProductsList';
import useOrderStore from '../hooks/useOrderStore';
import useProductStore from '../hooks/useProductStore';

export default function ProductsPage() {
  const navigate = useNavigate();

  const orderStore = useOrderStore();
  const productStore = useProductStore();

  const { products, productsTotalPageNumbers } = productStore;

  console.log(window.location.href);
  console.log('!!!!!!!!!!!!!!');

  useEffect(() => {
    orderStore.clearOrderState();
    productStore.fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/products/${id}`, { state: { id } });
  };

  const handlePageNumberClick = (number) => {
    productStore.changePageNumber(number);
    navigate(`/products?page=${number}`);
  };

  return (
    <div>
      <ProductsBanner />
      <ProductsList
        handleProductClick={handleProductClick}
        handlePageNumberClick={handlePageNumberClick}
        products={products}
        productsTotalPageNumbers={productsTotalPageNumbers}
      />
    </div>
  );
}
