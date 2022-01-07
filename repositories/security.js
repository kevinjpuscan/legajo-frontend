const Request = require('@/repositories/request')

class Security extends Request {
  /**
   *
   * @param {{identifier: string, password: string}} user
   * @returns {Promise<{jwt: string, user: Object}>}
   */
  login(user) {
    return this.$strapi.login(user)
  }

  /**
   *
   */
  logout() {
    this.$strapi.logout()
  }
}

module.exports = Security
