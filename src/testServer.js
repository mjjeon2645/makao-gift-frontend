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
      return res(ctx.json({
        amount: 40_000,
      }));
    }
    return null;
  }),
);

export default server;
