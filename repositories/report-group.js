const Request = require('@/repositories/request')
const qs = require('qs')
class ReportGroup extends Request {
  /**
   *
   * @param {Object} params
   * @returns {*}
   */
  find(params) {
    const stringifyParams = qs.stringify({ ...params })
    return this.$strapi.$http.$get(`/report-groups?${stringifyParams}`)
  }

  /**
   *
   * @param {int} id
   * @returns {*}
   */
  findOne(id) {
    return this.$strapi['$report-groups'].findOne(id)
  }

  /**
   *
   * @param params
   * @returns {params}
   */
  create(params) {
    return this.$strapi['$report-groups'].create(params)
  }

  /**
   *
   * @returns {Promise<unknown>}
   * @param id
   * @param params
   */
  update(id, params) {
    return this.$strapi['$report-groups'].update(id, params)
  }

  /**
   *
   * @returns {Promise<unknown>}
   * @param id
   */
  delete(id) {
    return this.$strapi['$report-groups'].delete(id)
  }

  /**
   *
   * @param {Object} params
   * @return {*}
   */
  count(params) {
    const stringifyParams = qs.stringify({ ...params }, { encode: false })
    return this.$strapi['$report-groups'].count(stringifyParams)
  }
}

module.exports = ReportGroup
