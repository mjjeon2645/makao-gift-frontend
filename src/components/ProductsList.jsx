import { useLocation, useNavigate } from 'react-router-dom';
import { giftshopStore } from '../stores/GiftshopStore';
import numberFormat from '../utils/numberFormat';

export default function ProductsList() {
  // TODO. 상품 리스트가 있을 경우 8개씩 해서 페이지네이션
  const { products } = giftshopStore;
  const { totalPageNumbers } = giftshopStore;

  const location = useLocation();

  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/products/${id}`, { state: { id } });
  };

  const handlePageNumberClick = (number) => {
    giftshopStore.changePageNumber(number);
    navigate(`/products?page=${number}`);
  };

  return (
    <div>
      <h3>인기선물을 한 자리에 모았어요</h3>
      {products.length ? (
        <>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <button type="button" onClick={() => handleProductClick(product.id)}>
                  <p>{product.imgSource}</p>
                  <p>{product.manufacturer}</p>
                  <p>{product.name}</p>
                  <p>
                    {numberFormat(product.price)}
                    원
                  </p>
                </button>
              </li>
            ))}
          </ul>
          <div>
            <ul>
              {totalPageNumbers.map((number) => (
                <li key={number}>
                  <button type="button" onClick={() => handlePageNumberClick(number)}>
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <h3>상품이 존재하지 않습니다</h3>
      )}
    </div>
  );
}
