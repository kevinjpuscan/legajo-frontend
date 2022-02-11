const Request = require('@/repositories/request')
const qs = require('qs')
class bonuses extends Request {
  /**
   *
   * @param {Object} params
   * @returns {*}
   */
  find(params) {
    const stringifyParams = qs.stringify({ ...params })
    return this.$strapi.$http.$get(`/bonuses?${stringifyParams}`)
  }

  /**
   *
   * @param {int} id
   * @returns {*}
   */
  findOne(id) {
    return this.$strapi.$bonuses.findOne(id)
  }

  /**
   *
   * @param params
   * @returns {params}
   */
  create(params) {
    return this.$strapi.$bonuses.create(params)
  }

  /**
   *
   * @returns {Promise<unknown>}
   * @param id
   * @param params
   */
  update(id, params) {
    return this.$strapi.$bonuses.update(id, params)
  }

  /**
   *
   * @returns {Promise<unknown>}
   * @param id
   */
  delete(id) {
    return this.$strapi.$bonuses.delete(id)
  }

  /**
   *
   * @param {Object} params
   * @return {*}
   */
  count(params) {
    const stringifyParams = qs.stringify({ ...params }, { encode: false })
    return this.$strapi.$bonuses.count(stringifyParams)
  }
}

module.exports = bonuses
