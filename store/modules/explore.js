const state = {};

const getters = {};

const actions = {
  getExplorePosts({ commit }, data) {
    return this.$axios.get('/api/explorer/get_posts', {})
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
}
