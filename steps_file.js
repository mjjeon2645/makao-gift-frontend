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

});
