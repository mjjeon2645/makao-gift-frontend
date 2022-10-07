import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useGiftshopStore from '../hooks/useGiftshopStore';
import numberFormat from '../utils/numberFormat';

export default function ProductDetail() {
  const giftshopStore = useGiftshopStore();

  const [accessToken] = useLocalStorage('accessToken', '');

  const location = useLocation();

  const navigate = useNavigate();

  const { id } = location.state;

  useEffect(() => {
    giftshopStore.fetchProduct(id);
  }, []);

  const detail = giftshopStore.product;

  // TODO. volume이 1일때 disabled 마이너스 이미지.
  // TODO. volume이 2이상일때 enabled 마이너스 이미지.
  const handleMinusClick = () => {
    giftshopStore.decreaseVolume();
  };

  const handlePlusClick = () => {
    giftshopStore.increaseVolume();
  };

  const handleOrderClick = () => {
    if (!accessToken) {
      navigate('/login', { state: { id } });
    }
    if (accessToken) {
      if (giftshopStore.amount < giftshopStore.totalPrice) {
        giftshopStore.changeAmountState('low');
        return;
      }

      giftshopStore.changeAmountState('');
      navigate('/order', { state: { id } });
    }
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
          <div>
            {giftshopStore.volume === 1 ? (
              <button type="button" disabled={giftshopStore.volume === 1}>비-</button>
            ) : (
              <button type="button" onClick={handleMinusClick}>
                활-
              </button>
            )}
            <p>{giftshopStore.volume}</p>
            <button type="button" onClick={handlePlusClick}>+</button>
          </div>
        </div>
        <div>
          <p>상품설명</p>
          <p>{detail.description}</p>
        </div>
        <div>
          <p>총 상품금액&#58;</p>
          <p>
            {numberFormat(giftshopStore.totalPrice)}
            원
          </p>
        </div>
        <button type="button" onClick={handleOrderClick}>선물하기</button>
        {giftshopStore.isLowAmount ? (
          <p>❌잔액이 부족하여 선물하기가 불가합니다❌</p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
