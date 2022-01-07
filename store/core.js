import { ToastProgrammatic as Toast } from 'buefy'
import { MESSAGE_TYPE } from '~/constants/core'
export const state = () => ({
  messages: {
    visibile: false,
    content: undefined,
    type: 'is-success',
  },
})

export const mutations = {
  showMessage(state, { content, type }) {
    state.messages = { content, type, visible: true }
  },
}
export const actions = {
  showMessage(context, { message, type = MESSAGE_TYPE.SUCCESS }) {
    context.commit('showMessage', { message, type })
    Toast.open({
      message,
      type,
      queue: false,
      duration: 3000,
    })
  },
  sucessMessage(context, message) {
    context.commit('showMessage', { message, type: MESSAGE_TYPE.SUCCESS })
    Toast.open({
      message,
      type: MESSAGE_TYPE.SUCCESS,
      queue: false,
      duration: 3000,
    })
  },
  errorMessage(context, message) {
    context.commit('showMessage', { message, type: MESSAGE_TYPE.DANGER })
    Toast.open({
      message,
      type: MESSAGE_TYPE.DANGER,
      queue: false,
      duration: 3000,
    })
  },
}
