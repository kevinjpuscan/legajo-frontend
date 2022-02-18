const Request = require('@/repositories/request')
const qs = require('qs')
class Report extends Request {
  /**
   *
   * @param {Object} params
   * @returns {*}
   */
  find(params) {
    const stringifyParams = qs.stringify({ ...params })
    return this.$strapi.$http.$get(`/reports?${stringifyParams}`)
  }

  /**
   *
   * @param {Object} params
   * @returns {*}
   */
  getData(params) {
    const stringifyParams = qs.stringify({ ...params })
    return this.$strapi.$http.$get(`/reports/data?${stringifyParams}`)
  }

  /**
   *
   * @param {Object} body
   * @returns {*}
   */
  getFilterOptions(body) {
    return this.$strapi.$http.$post(`/reports/filter-options`, body)
  }
}

module.exports = Report
