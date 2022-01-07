const Request = require('@/repositories/request')
const { encodeQueryParams } = require('@/util/query')
const qs = require('qs')
class User extends Request {
  /**
   *
   * @param {int} id
   * @returns {*}
   */
  findOne(id) {
    return this.$strapi.$users.findOne(id)
  }

  /**
   *
   * @param params
   * @returns {params}
   */
  create(params) {
    return this.$strapi.$users.create(params)
  }

  /**
   *
   * @returns {Promise<unknown>}
   * @param id
   * @param params
   */
  update(id, params) {
    return this.$strapi.$users.update(id, params)
  }

  /**
   * @param {string} data.currentPassword
   * @param {string} data.newPassword
   * @param {string} data.confirmPassword
   * @returns {Promise<any>}
   */
  changePassword(data) {
    return this.$strapi.$http.$post('/me/change-password', data)
  }


  /**
   *
   * @param {Object} params
   * @return {*}
   */
  count(params) {
    const stringifyParams = qs.stringify({ ...params }, { encode: false })
    return this.$strapi.$users.count(stringifyParams)
  }
}

module.exports = User
