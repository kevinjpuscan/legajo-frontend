const Request = require('@/repositories/request')
const qs = require('qs')
class Upload extends Request {
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
    return this.$strapi.$upload.findOne(id)
  }

  /**
   *
   * @param params
   * @returns {params}
   */
  create(files) {
    const formData = new FormData()
    Array.from(Array(files.length).keys()).map((x) => {
      formData.append('files', files[x], files[x].name)
    })
    return this.$strapi.$upload.create(formData)
  }

  /**
   *
   * @returns {Promise<unknown>}
   * @param id
   * @param params
   */
  update(id, params) {
    return this.$strapi.$upload.update(id, params)
  }

  /**
   *
   * @returns {Promise<unknown>}
   * @param id
   */
  delete(id) {
    return this.$strapi.$upload.delete(id)
  }

  /**
   *
   * @param {Object} params
   * @return {*}
   */
  count(params) {
    const stringifyParams = qs.stringify({ ...params }, { encode: false })
    return this.$strapi.$upload.count(stringifyParams)
  }
}

module.exports = Upload
