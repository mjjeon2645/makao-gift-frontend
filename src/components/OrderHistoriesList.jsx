import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useProductStore from '../hooks/useProductStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 1300px;
`;

const Wrapper = styled.div`
  max-width: 1680px;
  height: 600px;
  padding-inline: calc((100% - 1200px) / 2);
  margin-top: 5em;
`;

const Title = styled.h2`
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 3em;
`;

const None = styled.h2`
  font-size: 1.2em;
  font-weight: bold;
  /* text-align: center; */
  position: absolute;
  top: 30%;
  left: 45%;
`;

const History = styled.button`
  background-color: transparent;
  text-align: left;
  border: none;
`;

const Lists = styled.ul`
  /* width: 70%; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3em;
  flex-wrap: wrap;
`;

const ImageBox = styled.div`
  position: relative;
  width: 250px;
  height: 250px;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const TextBox = styled.div`
  width: 250px;
  height: 100px;
  /* height: 200px; */

  p {
    margin-bottom: .3em;
    word-break: keep-all;
  }

  p:first-child {
    color: #999999;
  }

  p.name {
    width: 250px;
    height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  strong {
    font-size: 1.1em;
    font-weight: bold;
  }
`;

const PageNumber = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3em;

  ul {
    display: flex;
  }

  ul li {
    margin-inline: 1em;
  }

  ul li button {
    color: #9a9a9a;
    background: none;
    border: none;
  }
`;

export default function OrderHistoriesList() {
  const productStore = useProductStore();
  const navigate = useNavigate();

  const { orderHistories, historiesTotalPageNumbers } = productStore;

  const handleHistoryClick = (id) => {
    navigate(`/orders/${id}`, { state: { id } });
  };

  const handlePageNumberClick = (number) => {
    productStore.changeHistoriesPageNumber(number);
    navigate(`/orders?page=${number}`);
  };

  return (
    <Container>
      {orderHistories.length === 0 ? (
        <None>내가 주문한 내역이 없습니다</None>
      ) : (
        <Wrapper>
          <Title>내가 주문한 내역입니다</Title>
          <Lists>
            {orderHistories.map((orderHistory) => (
              <li key={orderHistory.id}>
                <History type="button" onClick={() => handleHistoryClick(orderHistory.id)}>
                  <ImageBox>
                    <img src={orderHistory.imgSource} alt={orderHistory.productName} />
                  </ImageBox>
                  <TextBox>
                    <p>{orderHistory.manufacturer}</p>
                    <p>{orderHistory.productName}</p>
                    <strong>
                      To.
                      {' '}
                      {orderHistory.receiver}
                    </strong>
                  </TextBox>
                </History>
              </li>
            ))}
          </Lists>
          <PageNumber>
            <ul>
              {historiesTotalPageNumbers.map((number) => (
                <li key={number}>
                  <button type="button" onClick={() => handlePageNumberClick(number)}>
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </PageNumber>
        </Wrapper>
      )}
    </Container>
  );
}
