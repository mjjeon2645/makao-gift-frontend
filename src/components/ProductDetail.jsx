import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import styled from 'styled-components';
import useUserStore from '../hooks/useUserStore';
import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/numberFormat';
import MinusGray from '../assets/images/minus-gray.png';
import MinusBlack from '../assets/images/minus-black.png';
import PlusBlack from '../assets/images/plus-black.png';

const Wrapper = styled.div`
  width: 100%;
  padding-top: 10em;
  display: flex;
  justify-content: center;
`;

const ImageBox = styled.div`
  position: relative;
  width: 450px;
  height: 450px;
  margin-right: 5em;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentBox = styled.div`
  width: 30%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding-block: 1.3em;
  border-top: 1px solid #D9D9D9;
`;

const LastRow = styled.div`
  display: flex;
  align-items: center;
  padding-block: 1.3em;
  border-top: 1px solid #D9D9D9;
  border-bottom: 1px solid #D9D9D9;
`;

const ProductName = styled.h2`
  font-size: 1.5em;
`;

const Price = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  margin-block: 1em; 
`;

const Label = styled.p`
  display: inline-block;
  width: 25%;
  color: #444444;
`;

const Manufacturer = styled.p`
  display: inline-block;
  font-size: 1.1em;
  color: #666666;
`;

const AmountController = styled.div`
  width: 23%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .2em .2em;
  border: 1px solid #DDDDDD;
  border-radius: 6px;
`;

const DisabledMinus = styled.button`
  position: relative;
  width: 25px;
  height: 25px;
  background: transparent;
  border: none;

  img {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 25px;
  }
`;

const EnabledMinus = styled.button`
 position: relative;
  width: 25px;
  height: 25px;
  background: transparent;
  border: none;

  img {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 25px;
  }
`;

const Plus = styled.button`
 position: relative;
  width: 25px;
  height: 25px;
  background: transparent;
  border: none;

  img {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 25px;
  }
`;

const Description = styled.p`
  display: inline-block;
  font-size: 1.1em;
  color: #666666;
`;

const TotalPriceSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-block: 2em;

  p:first-child {
    color: #444444;
    margin-right: .5em;
  }
`;

const TotalPrice = styled.p`
  display: inline-block;
  font-size: 2em;
  font-weight: bold;
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

const Error = styled.p`
  font-weight: bold;
  color: #ff0000;
  text-align: center;
  margin-top: 2em;
`;

export default function ProductDetail() {
  const userStore = useUserStore();

  const productStore = useProductStore();

  const [accessToken] = useLocalStorage('accessToken', '');

  const location = useLocation();

  const navigate = useNavigate();

  const { id } = location.state;

  useEffect(() => {
    productStore.fetchProduct(id);
  }, []);

  const detail = productStore.product;

  const handleMinusClick = () => {
    productStore.decreaseVolume();
  };

  const handlePlusClick = () => {
    productStore.increaseVolume();
  };

  const handleOrderClick = () => {
    if (!accessToken) {
      navigate('/login', { state: { id } });
    }
    if (accessToken) {
      if (userStore.amount < productStore.totalPrice) {
        productStore.changeAmountState('low');
        return;
      }

      productStore.changeAmountState('');
      navigate('/order', { state: { id } });
    }
  };

  return (
    <Wrapper>
      <ImageBox>
        <img src={detail.imgSource} alt="" />
      </ImageBox>
      <ContentBox>
        <ProductName>{detail.name}</ProductName>
        <Price>
          {numberFormat(detail.price)}
          원
        </Price>
        <Row>
          <Label>제조사</Label>
          <Manufacturer>{detail.manufacturer}</Manufacturer>
        </Row>
        <Row>
          <Label>구매수량</Label>
          <AmountController>
            {productStore.volume === 1 ? (
              <DisabledMinus type="button" name="minusgray" disabled={productStore.volume === 1}>
                <img src={MinusGray} alt="" />
              </DisabledMinus>
            ) : (
              <EnabledMinus type="button" name="minusblack" onClick={handleMinusClick}>
                <img src={MinusBlack} alt="" />
              </EnabledMinus>
            )}
            <p>{productStore.volume}</p>
            <Plus type="button" name="plusblack" onClick={handlePlusClick}>
              <img src={PlusBlack} alt="" />
            </Plus>
          </AmountController>
        </Row>
        <LastRow>
          <Label>상품설명</Label>
          <Description>{detail.description}</Description>
        </LastRow>
        <TotalPriceSection>
          <p>총 상품금액:</p>
          <TotalPrice>
            {numberFormat(productStore.totalPrice)}
            원
          </TotalPrice>
        </TotalPriceSection>
        <Button type="button" onClick={handleOrderClick}>선물하기</Button>
        {productStore.isLowAmount ? (
          <Error>❌잔액이 부족하여 선물하기가 불가합니다❌</Error>
        ) : (
          ''
        )}
      </ContentBox>
    </Wrapper>
  );
}
