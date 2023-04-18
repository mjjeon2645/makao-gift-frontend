import { waitFor } from '@testing-library/react';
import ProductStore from './ProductStore';

const context = describe;

describe('ProductStore => FetchProducts', () => {
  let productStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  context('전체 상품목록 조회(물품 총 2개)', () => {
    it('2개의 물품 확인 가능', async () => {
      await productStore.fetchProducts();

      expect(productStore.products.length).toBe(2);
      expect(productStore.products[0].manufacturer).toBe('GIVENCHY');
      expect(productStore.products[1].description).toBe('아이폰 14 싸다');
      expect(productStore.productsTotalPageNumbers).toStrictEqual([1, 2]);
    });
  });
});

describe('ProductStore => FetchProducts', () => {
  let productStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  context('2페이지 조회', () => {
    it('2개의 물품 확인 가능', async () => {
      await productStore.changePageNumber(2);

      expect(productStore.products.length).toBe(2);
      expect(productStore.products[0].manufacturer).toBe('테스터 9');
      expect(productStore.products[1].description).toBe('테스트용 10 입니다');
    });
  });
});

describe('ProductStore => FetchProduct', () => {
  let productStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  context('아이디 1인 상품 조회', () => {
    it('해당 상품의 상세정보 확인 가능', async () => {
      await productStore.fetchProduct(1);

      expect(productStore.product).toBeTruthy();
      expect(productStore.product.manufacturer).toBe('테스터 1');
      expect(productStore.product.description).toBe('테스트용 1 입니다');
      expect(productStore.product.price).toBe(10000);
    });
  });

  context('아이디 1인 상품의 수량을 변경', () => {
    it('수량이 변경됨', async () => {
      await productStore.fetchProduct(1);
      productStore.increaseVolume();
      productStore.increaseVolume();

      expect(productStore.volume).toBe(3);
      expect(productStore.totalPrice).toBe(30000);

      productStore.decreaseVolume();

      expect(productStore.volume).toBe(2);
      expect(productStore.totalPrice).toBe(20000);
    });
  });
});
