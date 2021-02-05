import axios from 'axios'

const state = {}

const getters = {}

const actions = {
  login ({ commit }, credential) {
    let data = new FormData()
    data.append('username', credential.username)
    data.append('password', credential.password)

    return this.$auth.loginWith('local', { data })
  },
  registerUser ({ commit }, userInfo) {
    let data = new FormData()
    data.append('first_name', userInfo.firstname)
    data.append('last_name', userInfo.lastname)
    data.append('username', userInfo.username)
    data.append('email', userInfo.email)
    data.append('password', userInfo.password)

    return this.$axios.post('/api/auth/register', data)
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
