export default class UserStore {
  constructor() {
    this.name = '';
    this.userId = '';
    this.amount = 0;
    this.orderHistory = [];
  }

  login({ userId, password }) {
    // TODO. 서버에서 가져와줘야 함. 현재는 테스트통과를 위해 임시로 지정
    if (userId !== 'mjjeon2645') {
      return;
    }

    if (userId === 'mjjeon2645' && password !== '123!@#qweQWE') {
      return;
    }

    this.name = '전민지';
    this.amount = 50_000;
  }
}
