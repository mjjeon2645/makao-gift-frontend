import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/numberFormat';

export default function OrderForm() {
  const productStore = useProductStore();

  const navigate = useNavigate();

  // const { state } = useLocation();

  // 이거 필요한가?
  // const productId = state.id;

  const { name, manufacturer } = productStore.product;

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = async (data) => {
    const { receiver, address, message } = data;

    await productStore.order({ receiver, address, message });

    // TODO. 주문조회 매뉴로 이동. 내 주문내역이 업데이트 되어 뿌려져야 함
    navigate('/orders');
  };

  return (
    <div>
      <div>
        <p>{manufacturer}</p>
        <p>{name}</p>
        <p>
          구매수량&#58;
          {' '}
          {productStore.volume}
        </p>
        <p>
          총 상품금액&#58;
          {' '}
          {numberFormat(productStore.totalPrice)}
          원
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="input-receiver">받는 분 성함</label>
          <input
            id="input-receiver"
            maxLength="7"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register(
              'receiver',
              {
                required: { value: true, message: '성함을 입력해주세요' },
                pattern: { value: /^[ㄱ-ㅎ|가-힣]{3,7}$/, message: '성함을 다시 확인해주세요' },
              },
            )}
          />
          {errors.receiver ? (
            <p>{errors.receiver.message}</p>
          ) : (
            <p>3~7자까지 한글만 사용 가능</p>
          )}
        </div>
        <div>
          <label htmlFor="input-address">받는 분 주소</label>
          <input
            id="input-address"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('address', { required: { value: true, message: '주소를 입력해주세요' } })}
          />
          {errors.address ? (
            <p>{errors.address.message}</p>
          ) : (
            <p>주소지를 입력해주세요</p>
          )}
        </div>
        <div>
          <label htmlFor="input-message">받는 분께 보내는 메세지</label>
          <textarea
            id="input-message"
            maxLength="100"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('message', { required: false })}
          />
          <p>100글자 이내로 입력해주세요</p>
        </div>
        <button type="submit">선물하기</button>
      </form>
    </div>
  );
}
