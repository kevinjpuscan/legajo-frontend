const Request = require('@/repositories/request')
const qs = require('qs')
class Section extends Request {
  /**
  *
  * @param {Object} params
  * @returns {*}
  */
 find(params) {
   const stringifyParams = qs.stringify({ ...params })
   return this.$strapi.$http.$get(`/sections?${stringifyParams}`)
 }
  /**
   *
   * @param {int} id
   * @returns {*}
   */
  findOne(id) {
    return this.$strapi.$sections.findOne(id)
  }

  /**
   *
   * @param params
   * @returns {params}
   */
  create(params) {
    return this.$strapi.$sections.create(params)
  }

  /**
   *
   * @returns {Promise<unknown>}
   * @param id
   * @param params
   */
  update(id, params) {
    return this.$strapi.$sections.update(id, params)
  }

  /**
   *
   * @param {Object} params
   * @return {*}
   */
  count(params) {
    const stringifyParams = qs.stringify({ ...params }, { encode: false })
    return this.$strapi.$sections.count(stringifyParams)
  }
}

module.exports = Section
