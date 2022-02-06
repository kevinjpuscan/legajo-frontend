export const state = () => ({
  worker: {
    id: null,
    photo: {
      url: null,
    },
    job_position: {
      organizational_unit: {},
    },
  },
})
export const mutations = {
  SET_WORKER(state, worker) {
    state.worker = worker
  },
}
export const getters = {
  getWorker(state) {
    return state.worker
  },
}
export const actions = {
  fetchWorker(context, payload) {
    return new Promise((resolve, reject) => {
      this.$repository.worker
        .find({
          _where: { id: payload },
          populate: [
            'job_position',
            'job_position.organizational_unit',
            'photo',
          ],
        })
        .then((response) => {
          context.commit('SET_WORKER', response[0])
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
