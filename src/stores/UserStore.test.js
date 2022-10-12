import { waitFor } from '@testing-library/react';
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

describe('UserStore => login', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  describe('login', () => {
    context('정확한 id, password로 로그인', () => {
      it('로그인 성공', async () => {
        await userStore.login({ userId: 'mjjeon2645', password: '123qweQWE$' });

        expect(userStore.name).toBe('전민지');
        expect(userStore.amount).toBe(50_000);
      });
    });

    context('id가 틀렸을 때', () => {
      it('로그인 실패', async () => {
        await userStore.login({ userId: 'xxx', password: '123!@#qweQWE' });

        expect(userStore.name).toBeFalsy();
        expect(userStore.amount).toBeFalsy();
      });
    });

    context('password가 틀렸을 때', () => {
      it('로그인 실패', async () => {
        await userStore.login({ userId: 'mjjeon2645', password: '123!@#qweQWE!' });

        expect(userStore.name).toBeFalsy();
        expect(userStore.amount).toBeFalsy();
      });
    });
  });
});

describe('UserStore => signUp', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  describe('signUp', () => {
    context('조건에 맞는 id, 이름, 패스워드, 체크패스워드 입력', () => {
      it('회원가입 성공', async () => {
        const data = await userStore.signUp({
          name: '전민지',
          userId: 'mjjeon2645',
          password: '123qweQWE$',
          checkPassword: '123qweQWE$',
        });

        waitFor(() => {
          expect(data.name).toBe('전민지');
          expect(data.userId).toBe('mjjeon2645');
          expect(data.amount).toBe(50_000);
        });
      });
    });

    context('이름이 조건에 맞지 않을 때', () => {
      it('회원가입 실패', async () => {
        await userStore.signUp({
          name: '전민지123',
          userId: 'mjjeon2645',
          password: '123!@#qweQWE',
          checkPassword: '123!@#qweQWE',
        });

        expect(userStore.name).toBeFalsy();
        expect(userStore.userId).toBeFalsy();
        expect(userStore.amount).toBeFalsy();
      });
    });

    context('아이디가 조건에 맞지 않을 때', () => {
      it('회원가입 실패', async () => {
        await userStore.signUp({
          name: '전민지',
          userId: 'abc',
          password: '123!@#qweQWE',
          checkPassword: '123!@#qweQWE',
        });

        expect(userStore.name).toBeFalsy();
        expect(userStore.userId).toBeFalsy();
        expect(userStore.amount).toBeFalsy();
      });
    });

    context('비밀번호가 조건에 맞지 않을 때', () => {
      it('회원가입 실패', async () => {
        await userStore.signUp({
          name: '전민지',
          userId: 'mjjeon2645',
          password: '1234',
          checkPassword: '1234',
        });

        expect(userStore.name).toBeFalsy();
        expect(userStore.userId).toBeFalsy();
        expect(userStore.amount).toBeFalsy();
      });
    });

    context('체크 비밀번호가 비밀번호와 같지 않지 않을 때', () => {
      it('회원가입 실패', async () => {
        await userStore.signUp({
          name: '전민지',
          userId: 'mjjeon2645',
          password: '123!@#qweQWE',
          checkPassword: '123!@#qweQWE!',
        });

        expect(userStore.name).toBeFalsy();
        expect(userStore.userId).toBeFalsy();
        expect(userStore.amount).toBeFalsy();
      });
    });
  });
});

describe('UserStore => fetchBalance', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  context('로그인 후 웹페이지 전체에서 본인의 잔액을 확인하고자 함', () => {
    it('잔액을 실시간으로 확인 가능', async () => {
      await userStore.login({ userId: 'mjjeon2645', password: '123qweQWE$' });
      userStore.fetchBalance();

      waitFor(() => {
        expect(userStore.amount).toBe(50_000);
      });
    });
  });
});
