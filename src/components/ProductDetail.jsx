import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useGiftshopStore from '../hooks/useGiftshopStore';
import numberFormat from '../utils/numberFormat';

export default function ProductDetail() {
  const giftshopStore = useGiftshopStore();

  const location = useLocation();

  const { id } = location.state;

  useEffect(() => {
    const data = giftshopStore.fetchProduct(id);
    console.log(data);
  }, []);

  const detail = giftshopStore.product;
  console.log(detail);

  const handleClick = () => {
    //
  };
  return (
    <div>
      <div>{detail.imgSource}</div>
      <div>
        <p>{detail.name}</p>
        <p>
          {numberFormat(detail.price)}
          원
        </p>
        <div>
          <p>제조사</p>
          <p>{detail.manufacturer}</p>
        </div>
        <div>
          <p>구매수량</p>
          <p>숫자와 버튼</p>
        </div>
        <div>
          <p>상품설명</p>
          <p>{detail.description}</p>
        </div>
        <div>
          <p>총 상품금액&#58;</p>
          <p>10,000원</p>
        </div>
        <button type="button" onClick={handleClick}>선물하기</button>
      </div>
    </div>
  );
}
