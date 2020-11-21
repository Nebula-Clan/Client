import axios from 'axios'

const state = {};

const getters = {};

const actions = {
  // Requests
  getAllUserCommunities({commit}) {
    return this.$axios.get('/api/community/user_communities', {})
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
}
