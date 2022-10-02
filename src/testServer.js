/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.post(`${baseUrl}/session`, async (req, res, ctx) => {
    const { userId, password } = await req.json();

    if (userId === 'mjjeon2645' && password === '123!@#qweQWE') {
      return res(ctx.json({
        accessToken: 'ACCESS.TOKEN',
        name: '전민지',
        amount: 50_000,
        orderHistory: [],
      }));
    }
    return res(ctx.status(400));
  }),
);

export default server;
