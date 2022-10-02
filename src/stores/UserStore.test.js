import UserStore from './UserStore';

const context = describe;

describe('UserStore', () => {
  describe('login', () => {
    context('정확한 id, password로 로그인', () => {
      it('로그인 성공', () => {
        const userStore = new UserStore();

        userStore.login({ userId: 'mjjeon2645', password: '123!@#qweQWE' });

        expect(userStore.name).toBe('전민지');
        expect(userStore.amount).toBe(50_000);
      });
    });

    context('id가 틀렸을 때', () => {
      it('로그인 실패', () => {
        const userStore = new UserStore();

        userStore.login({ userId: 'xxx', password: '123!@#qweQWE' });

        expect(userStore.name).toBeFalsy();
        expect(userStore.amount).toBeFalsy();
      });
    });

    context('password가 틀렸을 때', () => {
      it('로그인 실패', () => {
        const userStore = new UserStore();

        userStore.login({ userId: 'mjjeon2645', password: '123!@#qweQWE!' });

        expect(userStore.name).toBeFalsy();
        expect(userStore.amount).toBeFalsy();
      });
    });
  });
});
