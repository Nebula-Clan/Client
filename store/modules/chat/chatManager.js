import { ChatProfile } from './models/chatprofile'

const state = () => ({
    profiles: [],
    websocket: null
})
  
const getters = {
    getProfileList: (state) => {
        return state.profiles
    },
    getProfileByUsername: (state, username) => {
        return state.profiles.find((profile) => {
            return profile.username === username
        })
    },
    getWebSocket: (state) => {
        return state.websocket
    }
}
  
const mutations = {
    addProfileAndParse(state, profileJson) {
        let chatProfile = new ChatProfile()
        chatProfile.parseFromJson(profileJson)
        state.profile.push(chatProfile)
    },
    addMessageToProfile(state, messageJson) {
        profile.pushMessage(messageJson)
    },
    setSocket(state, webScoket) {
        state.websocket = webScoket
    }
}
  
const actions = {
    pushMessageToProfile({ state, commit}, username, messageJson) {
        let profile = state.profiles.find((profile) => {
            return profile.username === username
        })
        if (profile == undefined || profile == null) {
            return false
        }
        commit('addMessageToProfile', profile, messageJson)
        return true
    },
    addProfile({ state, commit}, profileJson) {
        commit('addProfileAndParse', profileJson)
        return true
    },
    setWebSocket({ state, commit}, webSocket) {
        commit('setSocket', webSocket)
        return true
    }
}


export default {
    state,
    getters,
    mutations,
    actions
}