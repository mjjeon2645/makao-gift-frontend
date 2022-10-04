import { giftshopStore } from '../stores/GiftshopStore';
import numberFormat from '../utils/numberFormat';

export default function ProductsList() {
  // 상품 리스트가 있을 경우 8개씩 해서 페이지네이션

  const { products } = giftshopStore;
  return (
    <div>
      <h3>인기선물을 한 자리에 모았어요</h3>
      {products.length ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <p>{product.imgSource}</p>
              <p>{product.manufacturer}</p>
              <p>{product.name}</p>
              <p>
                {numberFormat(product.price)}
                원
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <h3>상품이 존재하지 않습니다</h3>
      )}
    </div>
  );
}
