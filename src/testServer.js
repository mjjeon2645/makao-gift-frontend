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
);

export default server;
