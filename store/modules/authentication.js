import axios from 'axios';

const state = {
};

const getters = {
};

const actions = {
  async login({commit}, credential) {
    // prepare data
    let data = new FormData()
    data.append('username', credential.username)
    data.append('password', credential.password)
    try {
      const response = await this.$auth.loginWith('local', { data });
    } catch (e) {
      console.log(e);
    }
  }
};

const mutations = {
};

export default {
  state,
  getters,
  actions,
  mutations
};
