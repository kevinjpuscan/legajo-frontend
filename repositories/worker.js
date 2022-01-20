const Request = require('@/repositories/request')
const qs = require('qs')
class Worker extends Request {
  /**
   *
   * @param {Object} params
   * @returns {*}
   */
  find(params) {
    const stringifyParams = qs.stringify({ ...params })
    return this.$strapi.$http.$get(`/workers?${stringifyParams}`)
  }

  /**
   *
   * @param {int} id
   * @returns {*}
   */
  findOne(id) {
    return this.$strapi.$workers.findOne(id)
  }

  /**
   *
   * @param params
   * @returns {params}
   */
  create(params) {
    return this.$strapi.$workers.create(params)
  }

  /**
   *
   * @returns {Promise<unknown>}
   * @param id
   * @param params
   */
  update(id, params) {
    return this.$strapi.$workers.update(id, params)
  }

  /**
   *
   * @param {Object} params
   * @return {*}
   */
  count(params) {
    const stringifyParams = qs.stringify({ ...params }, { encode: false })
    return this.$strapi.$workers.count(stringifyParams)
  }
}

module.exports = Worker
