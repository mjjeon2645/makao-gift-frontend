import { fireEvent, render, screen } from '@testing-library/react';

import ProductsList from './ProductsList';

let products;
let productsTotalPageNumbers;

const context = describe;

describe('ProductsList', () => {
  const handleProductClick = jest.fn();
  const handlePageNumberClick = jest.fn();

  function renderProductsList() {
    render(
      <ProductsList
        handleProductClick={handleProductClick}
        handlePageNumberClick={handlePageNumberClick}
        products={products}
        productsTotalPageNumbers={productsTotalPageNumbers}
      />,
    );
  }

  context('물품이 없을 때', () => {
    beforeEach(() => {
      products = [];
      productsTotalPageNumbers = [];
    });

    it('상품이 존재하지 않는 문구와 페이지 노출', () => {
      renderProductsList();

      screen.getByText('상품이 존재하지 않습니다');
    });
  });

  context('물품이 있을 때', () => {
    beforeEach(() => {
      products = [
        {
          description: '따뜻한 커피 한잔으로 마음을 전하세요',
          id: 0,
          imgSource: 'https://user-images.githubusercontent.com/104840243/194969483-7cbd463a-7b8a-4a4f-841a-53c833f27472.png',
          manufacturer: '투썸플레이스',
          name: '투썸플레이스 아메리카노',
          price: 4_900,
        },
        {
          description: '지방시 선물세트 누구나 다 좋아합니다',
          id: 1,
          imgSource: 'https://user-images.githubusercontent.com/104840243/194968445-034616c3-7ec9-46ec-8601-87ffb2239d4d.png',
          manufacturer: 'GIVENCHY',
          name: '누구나 좋아하는 지방시 선물세트',
          price: 10_000,
        },
        {
          description: '어른분들께 선물로 드리기 좋아요',
          id: 2,
          imgSource: 'https://user-images.githubusercontent.com/104840243/194969313-7aecf0b3-43b0-41a1-bc2f-4dee9472f67a.png',
          manufacturer: '상주농협',
          name: '맛있는 상주곶감',
          price: 30_000,
        },
      ];
      productsTotalPageNumbers = [1, 2];
    });

    it('변경된 문구와 상품목록 노출', () => {
      renderProductsList();
      screen.getByText('인기선물을 한 자리에 모았어요');

      screen.getByText('맛있는 상주곶감');
      screen.getByText('10,000');
      screen.getByText('4,900');
      screen.getByText('투썸플레이스');
    });

    it('특정제품 클릭 시 해당 제품의 상세페이지로 이동', () => {
      renderProductsList();

      fireEvent.click(screen.getByText('맛있는 상주곶감'));
      expect(handleProductClick).toBeCalled();
    });

    it('2페이지 클릭 시 페이지 변화', () => {
      renderProductsList();

      fireEvent.click(screen.getByText('2'));
      expect(handlePageNumberClick).toBeCalled();
    });
  });
});
