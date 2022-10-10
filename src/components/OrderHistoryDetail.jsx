import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/numberFormat';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10em;
`;

const Hero = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 13em;
  margin-bottom: 13em;
  background-color: #FFF5BD;
`;

const Wrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const ImageBox = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  padding-top: 3em;
  margin-bottom: 1em;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Manufacturer = styled.p`
  color: #999999;
  padding-block: .5em;
`;

const ProductName = styled.h2`
  font-size: 1.5em;
  font-weight: bold;
  padding-block: .5em;
  margin-bottom: 1em;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.2em;
  border-top: 1px solid #E0E0E0;

  p {
    display: inline-block;
  }

  p:first-child {
    font-size: .9em;

  }

  p:last-child {
    color: #666666;
  }
`;

const LastRow = styled.div`
   width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.2em;
  border-top: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;

  p {
    display: inline-block;
  }

  p:first-child {
    font-size: .9em;

  }

  p:last-child {
    color: #666666;
  }
`;

const Button = styled.button`
  color: ${(props) => props.theme.primaryButton.text};
  background: ${(props) => props.theme.primaryButton.background};
  border: none;
  border-radius: 4px;
  width: 100%;
  padding: 1.2em 2.8em;
  margin-top: 3em;
`;

export default function OrderHistoryDetail() {
  const location = useLocation();
  const { id } = location.state;

  const productStore = useProductStore();
  const { orderHistory } = productStore;

  const navigate = useNavigate();

  useEffect(() => {
    productStore.fetchOrderHistory(id);
  }, []);

  const handleOrderHistoriesClick = () => {
    navigate('/orders');
  };

  return (
    <Container>
      <Hero>
        <ImageBox>
          <img src={orderHistory.imgSource} alt="" />
        </ImageBox>
      </Hero>
      <Wrapper>
        <Manufacturer>{orderHistory.manufacturer}</Manufacturer>
        <ProductName>{orderHistory.productName}</ProductName>
        <Row>
          <p>구매수량</p>
          <p>{orderHistory.volume}</p>
        </Row>
        <Row>
          <p>총 상품금액</p>
          <p>
            {numberFormat(orderHistory.totalPrice)}
            원
          </p>
        </Row>
        <Row>
          <p>구매일</p>
          <p>{orderHistory.orderedDate}</p>
        </Row>
        <Row>
          <p>받는 분</p>
          <p>{orderHistory.receiver}</p>
        </Row>
        <Row>
          <p>받는 분 주소</p>
          <p>{orderHistory.address}</p>
        </Row>
        <LastRow>
          <p>받는 분께 보내는 메세지</p>
          <p>{orderHistory.message}</p>
        </LastRow>
        <Button type="button" onClick={handleOrderHistoriesClick}>
          주문 목록 보기
        </Button>
      </Wrapper>
    </Container>
  );
}
