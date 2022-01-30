const Request = require('@/repositories/request')
const qs = require('qs')
class License extends Request {
  /**
   *
   * @param {Object} params
   * @returns {*}
   */
  find(params) {
    const stringifyParams = qs.stringify({ ...params })
    return this.$strapi.$http.$get(`/work-licenses?${stringifyParams}`)
  }

  /**
   *
   * @param {int} id
   * @returns {*}
   */
  findOne(id) {
    return this.$strapi['work-licenses'].findOne(id)
  }

  /**
   *
   * @param params
   * @returns {params}
   */
  create(params) {
    return this.$strapi['work-licenses'].create(params)
  }

  /**
   *
   * @returns {Promise<unknown>}
   * @param id
   * @param params
   */
  update(id, params) {
    return this.$strapi['work-licenses'].update(id, params)
  }

  /**
   *
   * @param {Object} params
   * @return {*}
   */
  count(params) {
    const stringifyParams = qs.stringify({ ...params }, { encode: false })
    return this.$strapi['work-licenses'].count(stringifyParams)
  }
}

module.exports = License
