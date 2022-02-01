const Request = require('@/repositories/request')
const qs = require('qs')
class JobPosition extends Request {
  /**
   *
   * @param {Object} params
   * @returns {*}
   */
  find(params) {
    const stringifyParams = qs.stringify({ ...params })
    return this.$strapi.$http.$get(`/job-positions?${stringifyParams}`)
  }

  /**
   *
   * @param {int} id
   * @returns {*}
   */
  findOne(id) {
    return this.$strapi['job-positions'].findOne(id)
  }

  /**
   *
   * @param params
   * @returns {params}
   */
  create(params) {
    return this.$strapi['job-positions'].create(params)
  }

  /**
   *
   * @returns {Promise<unknown>}
   * @param id
   * @param params
   */
  update(id, params) {
    return this.$strapi['job-positions'].update(id, params)
  }

  /**
   *
   * @param {Object} params
   * @return {*}
   */
  count(params) {
    const stringifyParams = qs.stringify({ ...params }, { encode: false })
    return this.$strapi['job-positions'].count(stringifyParams)
  }
}

module.exports = JobPosition
