import { useLocation, useNavigate } from 'react-router-dom';
import { giftshopStore } from '../stores/GiftshopStore';
import numberFormat from '../utils/numberFormat';

export default function ProductsList() {
  // TODO. 상품 리스트가 있을 경우 8개씩 해서 페이지네이션
  const { products } = giftshopStore;

  const location = useLocation();
  console.log(location);
  console.log('프로덕트리스츠');

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/products/${id}`, { state: { id } });
  };

  return (
    <div>
      <h3>인기선물을 한 자리에 모았어요</h3>
      {products.length ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <button type="button" onClick={() => handleClick(product.id)}>
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
      ) : (
        <h3>상품이 존재하지 않습니다</h3>
      )}
    </div>
  );
}
