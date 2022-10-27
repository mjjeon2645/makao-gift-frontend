/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.post(`${baseUrl}/session`, async (req, res, ctx) => {
    const { userId, password } = await req.json();

    if (userId === 'mjjeon2645' && password === '123qweQWE$') {
      return res(ctx.json({
        accessToken: 'ACCESS.TOKEN',
        name: '전민지',
        amount: 50_000,
      }));
    }
    return res(ctx.status(400));
  }),

  rest.post(`${baseUrl}/users`, async (req, res, ctx) => {
    const {
      name, userId, password, checkPassword,
    } = await req.json();

    if (name === '전민지' && userId === 'mjjeon2645'
        && password === '123qweQWE$'
        && checkPassword === '123qweQWE$') {
      return res(ctx.json({
        name: '전민지',
        userId: 'mjjeon2645',
        amount: 50_000,
      }));
    }

    if (userId === 'mjjeon26457') {
      return res(
        ctx.status(400),
        ctx.json('해당 아이디는 사용할 수 없습니다'),
      );
    }

    if (userId === 'mjjeon26458') {
      return res(
        ctx.status(400),
        ctx.json('아이디 혹은 비밀번호가 맞지 않습니다'),
      );
    }

    return res(ctx.status(400));
  }),

  rest.get(`${baseUrl}/session/me`, async (req, res, ctx) => {
    const accessToken = await req.headers.get('Authorization');

    if (accessToken === 'Bearer ACCESS.TOKEN') {
      return res(ctx.json({
        balance: 50_000,
      }));
    }
    return res(ctx.status(400));
  }),

  rest.post(`${baseUrl}/order`, async (req, res, ctx) => {
    const {
      receiver, address, message, productId, volume, totalPrice,
    } = await req.json();

    if (receiver === '이서진' && address === '서울시' && message === '생일축하해~'
    && productId === 1 && volume === 1 && totalPrice === 10_000) {
      return res(ctx.json({
        amount: 40_000,
      }));
    }

    if (receiver === '이서진' && address === '서울시' && message === '생일축하해~'
    && productId === 2 && volume === 1 && totalPrice === 60_000) {
      return res(
        ctx.status(400),
        ctx.json('❌잔액이 부족하여 선물하기가 불가합니다❌'),
      );
    }
    return {};
  }),

  rest.get(`${baseUrl}/orders`, async (req, res, ctx) => {
    const accessToken = await req.headers.get('Authorization');
    if (accessToken === 'Bearer ACCESS.TOKEN') {
      return res(ctx.json({
        orderHistories: [
          {
            address: '서울시 양천구',
            id: 0,
            imgSource: 'https://user-images.githubusercontent.com/104840243/194969244-b2b64351-0a5e-429d-882b-e27a99ca2b73.png',
            manufacturer: '애플',
            message: '상균아 잘 써!',
            orderedDate: '2022-10-13',
            productName: '새로나온 아이폰 14',
            receiver: '이상균',
            totalPrice: 55000,
            volume: 1,
          },
          {
            address: '서울시 양천구',
            id: 1,
            imgSource: 'https://user-images.githubusercontent.com/104840243/194968445-034616c3-7ec9-46ec-8601-87ffb2239d4d.png',
            manufacturer: 'GIVENCHY',
            message: '서진아 생일축하해~',
            orderedDate: '2022-10-12',
            productName: '누구나 좋아하는 지방시 선물세트',
            receiver: '이서진',
            totalPrice: 10000,
            volume: 1,
          },
        ],
        totalPageNumbers: 1,
      }));
    }

    if (accessToken === 'Bearer ACCESS.TOKEN2') {
      return res(ctx.json({
        orderHistories: [],
        totalPageNumbers: 0,
      }));
    }
    return null;
  }),

  rest.get(`${baseUrl}/orders`, async (req, res, ctx) => {
    const accessToken = req.headers.get('Authorization');
    const page = req.params;

    if (accessToken === 'Bearer ACCESS.TOKEN' && page === 2) {
      return res(ctx.json({
        orderHistories: [
          {
            address: '서울시 양천구',
            id: 0,
            imgSource: 'https://user-images.githubusercontent.com/104840243/194969244-b2b64351-0a5e-429d-882b-e27a99ca2b73.png',
            manufacturer: '애플',
            message: '상균아 잘 써!',
            orderedDate: '2022-10-13',
            productName: '새로나온 아이폰 14',
            receiver: '이상균',
            totalPrice: 55000,
            volume: 1,
          },
          {
            address: '서울시 양천구',
            id: 1,
            imgSource: 'https://user-images.githubusercontent.com/104840243/194968445-034616c3-7ec9-46ec-8601-87ffb2239d4d.png',
            manufacturer: 'GIVENCHY',
            message: '서진아 생일축하해~',
            orderedDate: '2022-10-12',
            productName: '누구나 좋아하는 지방시 선물세트',
            receiver: '이서진',
            totalPrice: 10000,
            volume: 1,
          },
        ],
        totalPageNumbers: 2,
      }));
    }
    return res(ctx.status(400));
  }),

  rest.get(`${baseUrl}/orders/0`, async (req, res, ctx) => {
    const accessToken = req.headers.get('Authorization');

    if (accessToken === 'Bearer ACCESS.TOKEN') {
      return res(ctx.json({
        orderHistory:
         {
           address: '서울시 양천구',
           id: 0,
           imgSource: 'https://user-images.githubusercontent.com/104840243/194969244-b2b64351-0a5e-429d-882b-e27a99ca2b73.png',
           manufacturer: '애플',
           message: '상균아 잘 써!',
           orderedDate: '2022-10-13',
           productName: '새로나온 아이폰 14',
           receiver: '이상균',
           totalPrice: 55000,
           volume: 1,
         },
      }));
    }
    return res(ctx.status(400));
  }),

  rest.get(`${baseUrl}/products`, async (req, res, ctx) => {
    const page = req.url.searchParams.get('page');

    if (page === '2') {
      return res(ctx.json({
        products: [
          {
            id: 9,
            name: '테스트용 9',
            price: 90000,
            manufacturer: '테스터 9',
            description: '테스트용 9 입니다',
            imgSource: 'imgSource',
          },
          {
            id: 10,
            name: '테스트용 10',
            price: 100000,
            manufacturer: '테스터 10',
            description: '테스트용 10 입니다',
            imgSource: 'imgSource',
          },
        ],
      }));
    }

    if (page !== '2') {
      return res(ctx.json({
        products: [
          {
            id: 1,
            name: '누구나 좋아하는 지방시 선물세트',
            price: 10000,
            manufacturer: 'GIVENCHY',
            description: '지방시 선물세트 누구나 다 좋아합니다',
            imgSource: 'https://user-images.githubusercontent.com/104840243/194968445-034616c3-7ec9-46ec-8601-87ffb2239d4d.png',
          },
          {
            id: 2,
            name: '새로나온 아이폰 14',
            price: 45000,
            manufacturer: '애플',
            description: '아이폰 14 싸다',
            imgSource: 'https://user-images.githubusercontent.com/104840243/194969244-b2b64351-0a5e-429d-882b-e27a99ca2b73.png',
          },
        ],
        totalPageNumbers: 2,
      }));
    }

    return res(ctx.status(400));
  }),

  rest.get(`${baseUrl}/products/1`, async (req, res, ctx) => res(ctx.json(
    {
      id: 1,
      name: '테스트용 1',
      price: 10000,
      manufacturer: '테스터 1',
      description: '테스트용 1 입니다',
      imgSource: 'imgSource',
    },
  ))),
);
export default server;
