const { RESTDataSource } = require("apollo-datasource-rest");

class SmartAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://api.local.autoenrolment.co.uk:3000/";
  }

  willSendRequest(request) {
    request.headers.set("Authorization", "Token banana");
  }

  async getAdvisers() {
    return Promise.resolve((await this.get(`advisers`)).advisers);
  }

  async getAdviser(id) {
    return this.get(`advisers/${id}`);
  }

  async getUsers(adviserId) {
    return Promise.resolve(
      (await this.get(`advisers/${adviserId}/users`)).users
    );
  }

  async getUser(adviserId, id) {
    return this.get(`advisers/${adviserId}/users/${id}`);
  }

  async getCompany(slug) {
    return this.get(`companies/by_slug?slug=${slug}`);
  }

  async getCompanies() {
    return Promise.resolve((await this.get(`companies`)).companies);
  }
}

module.exports = SmartAPI;
