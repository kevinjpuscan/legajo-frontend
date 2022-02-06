const Request = require('@/repositories/request')
const qs = require('qs')
class Rotation extends Request {
  /**
   *
   * @param {Object} params
   * @returns {*}
   */
  find(params) {
    const stringifyParams = qs.stringify({ ...params })
    return this.$strapi.$http.$get(`/job-position-changes?${stringifyParams}`)
  }

  /**
   *
   * @param {int} id
   * @returns {*}
   */
  findOne(id) {
    return this.$strapi['$job-position-changes'].findOne(id)
  }

  /**
   *
   * @param params
   * @returns {params}
   */
  create(params) {
    return this.$strapi['$job-position-changes'].create(params)
  }

  /**
   *
   * @returns {Promise<unknown>}
   * @param id
   * @param params
   */
  update(id, params) {
    return this.$strapi['$job-position-changes'].update(id, params)
  }

  /**
   *
   * @returns {Promise<unknown>}
   * @param id
   */
  delete(id) {
    return this.$strapi['$job-position-changes'].delete(id)
  }

  /**
   *
   * @param {Object} params
   * @return {*}
   */
  count(params) {
    const stringifyParams = qs.stringify({ ...params }, { encode: false })
    return this.$strapi['$job-position-changes'].count(stringifyParams)
  }
}

module.exports = Rotation
