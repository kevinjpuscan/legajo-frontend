const Request = require('@/repositories/request')
const qs = require('qs')
class DocumentFactory extends Request {
  /**
  *
  * @param {Object} params
  * @returns {*}
  */
 find(params) {
   const stringifyParams = qs.stringify({ ...params })
   return this.$strapi.$http.$get(`/document-factories?${stringifyParams}`)
 }
  /**
   *
   * @param {int} id
   * @returns {*}
   */
  findOne(id) {
    return this.$strapi['document-factories'].findOne(id)
  }

  /**
   *
   * @param params
   * @returns {params}
   */
  create(params) {
    return this.$strapi['document-factories'].create(params)
  }

  /**
   *
   * @returns {Promise<unknown>}
   * @param id
   * @param params
   */
  update(id, params) {
    return this.$strapi['document-factories'].update(id, params)
  }

  /**
   *
   * @param {Object} params
   * @return {*}
   */
  count(params) {
    const stringifyParams = qs.stringify({ ...params }, { encode: false })
    return this.$strapi['document-factories'].count(stringifyParams)
  }
}

module.exports = DocumentFactory
