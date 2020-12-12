import { ChatProfile } from './models/chatprofile'

const state = () => ({
    profiles: [],
    websocket: null
})
  
const getters = {
    getProfileList: (state) => {
        return state.profiles
    },
    getWebSocket: (state) => {
        return state.websocket
    }
}
  
const mutations = {
    addProfileAndParse(state, profileJson) {
        let chatProfile = new ChatProfile()
        chatProfile.parseFromJson(profileJson)
        state.profiles.push(chatProfile)
    },
    addMessageToProfile(state, {findedProfile, messageJson}) {
        findedProfile.pushMessage(messageJson)
    },
    setSocket(state, webScoket) {
        state.websocket = webScoket
    }
}
  
const actions = {
    pushMessageToProfile({ state, commit}, {username, messageJson}) {
        let findedProfile = state.profiles.find((profile) => {
            return profile.username === username
        })
        if (findedProfile == undefined || findedProfile == null) {
            return false
        }
        commit('addMessageToProfile', {findedProfile, messageJson})
        return true
    },
    addProfile({ state, commit}, profileJson) {
        commit('addProfileAndParse', profileJson)
        return true
    },
    setWebSocket({ state, commit}, webSocket) {
        commit('setSocket', webSocket)
        return true
    },
    getProfileByUsername: ({ state, commit }, username) => {
        return state.profiles.find((profile) => {
            return profile.username === username
        })
    }
}


export default {
    state,
    getters,
    mutations,
    actions
}