import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/numberFormat';

const Container = styled.div`
  width: 70%;  
  border: 1px solid #EEEEEE;
  border-radius: 10px;
  padding: 3em 10em;
  margin-top: 5em;
`;

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 2.5em;
`;

const ImageBox = styled.div`
  position: relative;
  width: 150px;
  height: 150px;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 2em;
`;

const ManufacturerAndName = styled.div`
  p {
    margin-block: .7em;
  }

  p:first-child {
    color: #ACACAC;
  }
`;

const AmountAndTotalPrice = styled.div`
   p {
    margin-block: .7em;
  }
`;

const Form = styled.form`
  input {
    display: block;
    width: 100%;
    padding-block: 1em;
    padding-inline: 1em;
    margin-top: .7em;
    margin-bottom: .7em;
    border: 1px solid #EEEEEE;
  }

  input::placeholder {
     color: #CBCBCB;
   }

  input:focus {
    outline: 1px solid #42deb6;
    }

  div {
    margin-bottom: 1.5em;
  }
`;

const Label = styled.label`
  color: #A0A0A0;
  font-weight: bold;

  strong {
    color: #ff0000;
  }
`;

const SubLabel = styled.p`
  font-size: 0.9em;
  color: #999999;
  margin-top: .5em;
`;

const Button = styled.button`
  color: ${(props) => props.theme.primaryButton.text};
  background: ${(props) => props.theme.primaryButton.background};
  border: none;
  border-radius: 4px;
  width: 100%;
  padding: 1.2em 2.8em;
  margin-top: 1em;
`;

const Textfield = styled.textarea`
    display: block;
    width: 100%;
    padding-block: 1em;
    padding-inline: 1em;
    margin-top: .7em;
    margin-bottom: .7em;
    border: 1px solid #EEEEEE;
    resize: none;

  :focus {
    outline: 1px solid #42deb6;
    }
`;

const Error = styled.p`
  font-size: 0.9em;
  color: #ff0000;
  margin-top: 1em;
`;

export default function OrderForm() {
  const productStore = useProductStore();

  const navigate = useNavigate();

  const { name, manufacturer, imgSource } = productStore.product;

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = async (data) => {
    const { receiver, address, message } = data;

    await productStore.order({ receiver, address, message });

    navigate('/orders');
  };

  return (
    <Container>
      <Wrapper>
        <ImageBox>
          <img src={imgSource} alt="" />
        </ImageBox>
        <ContentBox>
          <ManufacturerAndName>
            <p>{manufacturer}</p>
            <p>{name}</p>
          </ManufacturerAndName>
          <AmountAndTotalPrice>
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
          </AmountAndTotalPrice>
        </ContentBox>
      </Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="input-receiver">
            받는 분 성함
            <strong>*</strong>
          </Label>
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
            <Error>{errors.receiver.message}</Error>
          ) : (
            <SubLabel>3~7자까지 한글만 사용 가능</SubLabel>
          )}
        </div>
        <div>
          <Label htmlFor="input-address">
            받는 분 주소
            <strong>*</strong>
          </Label>
          <input
            id="input-address"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('address', { required: { value: true, message: '주소를 입력해주세요' } })}
          />
          {errors.address ? (
            <Error>{errors.address.message}</Error>
          ) : (
            <SubLabel>주소지를 입력해주세요</SubLabel>
          )}
        </div>
        <div>
          <Label htmlFor="input-message">받는 분께 보내는 메세지</Label>
          <Textfield
            id="input-message"
            maxLength="100"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('message', { required: false })}
          />
          <SubLabel>100글자 이내로 입력해주세요</SubLabel>
        </div>
        <Button type="submit">선물하기</Button>
      </Form>
    </Container>
  );
}
