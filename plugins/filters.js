import Vue from 'vue'
import CONFIG from '~/config/index'

Vue.filter('fileUrl', (value) => {
  if (!value) return ''
  return `${CONFIG.strapiUrl}${value}`
})

Vue.filter('formatDate', (value) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-GB')
})

Vue.filter('capitalize', (word = '') => {
  if (word?.length === 0 || !word) {
    return word
  }
  return word.charAt(0).toUpperCase() + word.slice(1)
})
