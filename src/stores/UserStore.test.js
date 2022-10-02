import server from '../testServer';
import UserStore from './UserStore';

// 1. apiService 직접모킹
// jest.mock('../services/ApiService', () => ({
//   apiService: {
//     async postSession({ userId, password }) {
//       if (userId === 'mjjeon2645' && password === '123!@#qweQWE') {
//         return {
//           accessToken: 'ACCESS.TOKEN',
//           name: '전민지',
//           amount: 50_000,
//         };
//       }
//       return {};
//     },
//   },
// }));

// 2. __mocks__ 이용하여 모킹
// jest.mock('../services/ApiService');

// 3. testServer 모킹
beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

const context = describe;

describe('UserStore', () => {
  describe('login', () => {
    context('정확한 id, password로 로그인', () => {
      it('로그인 성공', async () => {
        const userStore = new UserStore();

        await userStore.login({ userId: 'mjjeon2645', password: '123!@#qweQWE' });

        expect(userStore.name).toBe('전민지');
        expect(userStore.amount).toBe(50_000);
      });
    });

    context('id가 틀렸을 때', () => {
      it('로그인 실패', async () => {
        const userStore = new UserStore();

        await userStore.login({ userId: 'xxx', password: '123!@#qweQWE' });

        expect(userStore.name).toBeFalsy();
        expect(userStore.amount).toBeFalsy();
      });
    });

    context('password가 틀렸을 때', () => {
      it('로그인 실패', async () => {
        const userStore = new UserStore();

        await userStore.login({ userId: 'mjjeon2645', password: '123!@#qweQWE!' });

        expect(userStore.name).toBeFalsy();
        expect(userStore.amount).toBeFalsy();
      });
    });
  });
});
