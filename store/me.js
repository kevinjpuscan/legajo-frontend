import ROLES from '@/constants/roles'
export const state = () => ({
  user: {
    id: 0,
    username: '',
    email: '',
    provider: 'local',
    confirmationToken: null,
    confirmed: null,
    blocked: null,
    role: {
      id: 0,
      name: '',
      description: '',
      type: '',
      created_by: null,
      updated_by: null,
    },
    created_by: null,
    updated_by: null,
    created_at: null,
    updated_at: null,
    names: '',
    lastnames: '',
  },
  token: {},
})
export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
}
export const getters = {
  isLogged(state) {
    return state.user?.id !== 0
  },
  roleType(state) {
    return state.user?.role?.type
  },
  fullNames(state) {
    return `${state?.user.names} ${state?.user?.lastnames}`
  },
  isAuthenticated(state) {
    return state.user.role?.type === ROLES.AUTHENTICATED
  },
  isPublic(state) {
    return state.user.role?.type === ROLES.PUBLIC
  },
}
export const actions = {
  login(context, payload) {
    return new Promise((resolve, reject) => {
      this.$repository.security
        .login(payload)
        .then((response) => {
          context.commit('SET_TOKEN', response.jwt)
          context.commit('SET_USER', response.user)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getUserInfo(context) {
    return new Promise((resolve) => {
      const user = this.$repository.me.getMe()
      context.commit('SET_USER', user)
      resolve(user)
    })
  },
  fetchUser(context) {
    return new Promise((resolve) => {
      const user = this.$repository.me.fetchUser()
      context.commit('SET_USER', user)
      resolve(user)
    })
  },
}
