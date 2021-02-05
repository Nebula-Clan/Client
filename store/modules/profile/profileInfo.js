import axios from 'axios'
import { Profile } from './classes/profile'

const state = () => ({
    profile: new Profile(),
    isReqSended: false
})
  
const getters = {
    getProfile(state) {
        return state.profile
    },
    getStatusOfReq(state) {
        return state.isReqSended
    }
}
  
const mutations = {
    parseReq(state, data) {
        let profile = new Profile()
        profile.parseFromJson(data)
        state.profile = profile
    },
    sendedReq(state, status) {
        state.isReqSended = status
    }
}
  
const actions = {
    getProfileInfo ({ commit }, username) {
        return this.$axios.get('api/profile/public?username=' + username)
        .then(({ data }) => {
            commit('parseReq', data)
            commit('sendedReq', true)
        })
        .catch((error) => {
            console.log(error)
            throw error
        })
      }
}


export default {
    state,
    getters,
    mutations,
    actions
}