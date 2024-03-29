import styled from 'styled-components';

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
  margin-top: 1em;

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

    &:focus {
      color: #444444;
    }
  }
`;

export default function OrderHistoriesList(
  {
    handleHistoryClick, handlePageNumberClick, orderHistories, historiesTotalPageNumbers,
  },
) {
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
                <History type="button" name={orderHistory.receiver} onClick={() => handleHistoryClick(orderHistory.id)}>
                  <ImageBox>
                    <img src={orderHistory.imgSource} alt={orderHistory.productName} />
                  </ImageBox>
                  <TextBox>
                    <p>{orderHistory.manufacturer}</p>
                    <p className="name">{orderHistory.productName}</p>
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
