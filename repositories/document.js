const Request = require('@/repositories/request')
const qs = require('qs')
class Document extends Request {
  /**
  *
  * @param {Object} params
  * @returns {*}
  */
 find(params) {
   const stringifyParams = qs.stringify({ ...params })
   return this.$strapi.$http.$get(`/documents?${stringifyParams}`)
 }
  /**
   *
   * @param {int} id
   * @returns {*}
   */
  findOne(id) {
    return this.$strapi['documents'].findOne(id)
  }

  /**
   *
   * @param params
   * @returns {params}
   */
  create(params) {
    return this.$strapi['documents'].create(params)
  }

  /**
   *
   * @returns {Promise<unknown>}
   * @param id
   * @param params
   */
  update(id, params) {
    return this.$strapi['documents'].update(id, params)
  }

  /**
   *
   * @param {Object} params
   * @return {*}
   */
  count(params) {
    const stringifyParams = qs.stringify({ ...params }, { encode: false })
    return this.$strapi['documents'].count(stringifyParams)
  }
}

module.exports = Document
