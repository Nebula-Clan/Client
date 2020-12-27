const state = {};

const getters = {};

const actions = {
  getExplorePosts({ commit }, data) {
    return this.$axios.get('/api/explorer/get_posts', {})
  },
  getExplorePeople({ commit }, data) {
    return this.$axios.get('api/search/search_in_users', {
      params: {
        key: ""
      }
    })
  }
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
}
