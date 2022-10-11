import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/numberFormat';

const Container = styled.div`
  padding-inline: calc((100% - 1200px) / 2);
`;

const Title = styled.h3`
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 3em;
  margin-bottom: 1.5em;
`;

const Wrapper = styled.div`
  max-width: 1680px;
  height: 600px;
  padding-inline: calc((100% - 1200px) / 2);
`;

const Product = styled.button`
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

export default function ProductsList() {
  const productStore = useProductStore();

  const { products, productsTotalPageNumbers } = productStore;

  // const location = useLocation();

  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/products/${id}`, { state: { id } });
  };

  const handlePageNumberClick = (number) => {
    productStore.changePageNumber(number);
    navigate(`/products?page=${number}`);
  };

  return (
    <Container>
      <Title>인기선물을 한 자리에 모았어요</Title>
      {products.length ? (
        <Wrapper>
          <Lists>
            {products.map((product) => (
              <li key={product.id}>
                <Product type="button" onClick={() => handleProductClick(product.id)}>
                  <ImageBox>
                    <img src={product.imgSource} alt={product.name} />
                  </ImageBox>
                  <TextBox>
                    <p>{product.manufacturer}</p>
                    <p className="name">{product.name}</p>
                    <p>
                      <strong>{numberFormat(product.price)}</strong>
                      원
                    </p>
                  </TextBox>
                </Product>
              </li>
            ))}
          </Lists>
          <PageNumber>
            <ul>
              {productsTotalPageNumbers.map((number) => (
                <li key={number}>
                  <button type="button" onClick={() => handlePageNumberClick(number)}>
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </PageNumber>
        </Wrapper>
      ) : (
        <h3>상품이 존재하지 않습니다</h3>
      )}
    </Container>
  );
}
