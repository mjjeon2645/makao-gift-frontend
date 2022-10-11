// in this file you can append custom step methods to 'I' object

const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
  resetUser() {
    this.amOnPage(`${backdoorBaseUrl}/reset-user`);
  },

  setupUser() {
    this.amOnPage(`${backdoorBaseUrl}/setup-user`);
  },

  resetProducts() {
    this.amOnPage(`${backdoorBaseUrl}/reset-products`);
  },

  setupThreeProducts() {
    this.amOnPage(`${backdoorBaseUrl}/setup-three-products`);
  },

  setupEighteenProducts() {
    this.amOnPage(`${backdoorBaseUrl}/setup-eighteen-products`);
  },

  resetOrderHistories() {
    this.amOnPage(`${backdoorBaseUrl}/reset-order-histories`);
  },

  login() {
    this.amOnPage('/login');
    this.fillField({ id: 'input-user-id' }, 'mjjeon2645');
    this.fillField({ id: 'input-password' }, '123qweQWE$');
    this.click('로그인하기');
  },

});
