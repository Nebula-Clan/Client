import axios from 'axios'

const state = {}

const getters = {}

const actions = {
  async login ({ commit }, credential) {
    // prepare data
    let data = new FormData()
    data.append('username', credential.username)
    data.append('password', credential.password)
    try {
      const response = await this.$auth.loginWith('local', { data })
    } catch (e) {
      console.log(e)
    }
  },
  async registerUser ({ commit }, userInfo) {
    // prepare data
    let data = new FormData()
    data.append('first_name', userInfo.firstname)
    data.append('last_name', userInfo.lastname)
    data.append('username', userInfo.username)
    data.append('email', userInfo.email)
    data.append('password', userInfo.password)
    try {
      const response = await this.$axios.post('/auth/register', data)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
