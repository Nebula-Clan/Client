import axios from 'axios'

const state = {};

const getters = {};

const actions = {
  // Requests
  getAllCategories({ commit }) {
    return this.$axios.get('/api/category/get_categories', {})
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
}
