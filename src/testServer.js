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
    return res(ctx.status(400));
  }),

  rest.get(`${baseUrl}/session/me`, async (req, res, ctx) => {
    const { headers } = await req.json();

    if (headers === { Authorization: 'Bearer ACCESS.TOKEN' }) {
      res(ctx.json({
        balance: 50_000,
      }));
    }
    return res(ctx.status(400));
  }),

  rest.post(`${baseUrl}/order`, async (req, res, ctx) => {
    const {
      receiver, address, message, productId, volume, totalPrice,
    } = await req.json();

    if (receiver === '이서진' && address === '서울시 양천구' && message === '서진아 생일축하해~'
    && productId === 1 && volume === 1 && totalPrice === 10_000) {
      res(ctx.json({
        amount: 40_000,
      }));
    }
    return null;
  }),

  rest.get(`${baseUrl}/orders`, async (req, res, ctx) => {
    const { headers } = await req.json();
    if (headers === { Authorization: 'Bearer ACCESS.TOKEN' }) {
      res(ctx.json({
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
        totalPageNumbers: [1],
      }));
    }
    return null;
  }),
);

export default server;
