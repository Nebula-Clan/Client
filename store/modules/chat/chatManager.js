import { ChatProfile } from './models/chatprofile'
import { ProfileListController } from './helper-classes/controllers/profilelistcontroller'

const getDefaultState = () => {
    let statusMap = new Map();
    statusMap.set('online', {text: 'online', textColor: 'teal--text text--accent-4', preferred: false})
    statusMap.set('typing', {text: 'typing', textColor: 'blue--text text--darken-1', preferred: true })
    return {
        userListController: new ProfileListController(),
        searchListController: new ProfileListController(),
        websocket: null,
        statusMap: statusMap
    }
}

const state = getDefaultState()
  
const getters = {
    getProfileList: (state) => {
        return state.userListController.profileList
    },
    getWebSocket: (state) => {
        return state.websocket
    },
    getUserListController: (state) => {
        return state.userListController
    },
    getSearchListController: (state) => {
        return state.searchListController
    }
}
  
const mutations = {
    addProfileToUserListAndParse(state, profileJson) {
        let chatProfile = new ChatProfile()
        chatProfile.parseProfileWithMessageFromJson(profileJson)
        if (!state.userListController.hasProfile(chatProfile.username)) {
            state.userListController.pushProfileInBack(chatProfile)
        }
    },
    addProfileInstanceToUserList(state, profileInstance) {
        if (!state.userListController.hasProfile(profileInstance.username)) {
            state.userListController.pushProfileInBack(profileInstance)
        }
    },
    addProfileToSearchListAndParse(state, profileJson) {
        let chatProfile = new ChatProfile()
        chatProfile.parseProfileFromJson(profileJson)
        if (!state.searchListController.hasProfile(chatProfile.username)) {
            state.searchListController.pushProfileInBack(chatProfile)
        }
    },
    addMessageJsonToProfile(state, {findedProfile, messageJson}) {
        findedProfile.pushMessageJson(messageJson)
    },
    addMessageArrayJsonToProfile(state, {findedProfile, messageJson}) {
        findedProfile.pushMessageArrayJson(messageJson)
    },
    addMessageInctanceToProfile(state, {findedProfile, messageInstance}) {
        findedProfile.pushMessage(messageInstance)
    },
    addMessageArrayInctanceToProfile(state, {findedProfile, messageInstance}) {
        findedProfile.pushMessageArray(messageInstance)
    },
    sortProfileMessages(state, { findedProfile }) {
        findedProfile.sortMessages()
    },
    setStatus(state, { findedProfile, status }) {
        findedProfile.profileStatus = status
    },
    addUnseen(state, { findedProfile, unseenCount }) {
        findedProfile.numberOfUnseenMessages += unseenCount
    },
    setObtainedMessage(state, { findedProfile, obtainStatus }) {
        findedProfile.isObtainedMessages = obtainStatus
    },
    setSocket(state, webScoket) {
        state.websocket = webScoket
    },
    swapProfileInFront(state, username) {
        state.userListController.swapProfileToFront(username)
    },
    setProfileLastMessage(state, { findedProfile, lastMessage, isJson }) {
        if (isJson) {
            findedProfile.changeLastMessage(lastMessage)
        } else {
            findedProfile.lastMessage = lastMessage
        }
    },
    setValidationOfProfileImg(state, { findedProfile, isValid }) {
        findedProfile.isValidProfileImg = isValid
    },
    seenProfileMessageWithID(state, { findedProfile, messageUUID }) {
        let message = findedProfile.messageList.find(message => message.messageUUID == messageUUID)
        if (message !== null && message !== undefined) {
            message.isSeen = true
        }
    },
    transferProfileFromSearchListToUserList(state, { findedProfile, username }) {
        if (!state.userListController.hasProfile(username)) {
            state.userListController.pushProfileInBack(findedProfile)
        }
    }
}
  
const actions = {
    getProfileWithUsername: ({ state, commit}, username) => {
        return state.userListController.findProfile(username)
    },
    getProfileFromSearchListWithUsername: ({ state, commit}, username) => {
        return state.searchListController.findProfile(username)
    },
    pushMessageJsonToProfile({ state, commit}, {username, messageJson, isArray}) {
        let findedProfile = state.userListController.findProfile(username)
        if (findedProfile == undefined || findedProfile == null) {
            return false
        }

        if (isArray == true) {
            commit('addMessageArrayJsonToProfile', {findedProfile, messageJson})
        } else {
            commit('addMessageJsonToProfile', {findedProfile, messageJson})
        }

        return true
    },
    pushMessageToProfile({ state, commit}, {username, messageInstance, isArray}) {
        let findedProfile = state.userListController.findProfile(username)
        if (findedProfile == undefined || findedProfile == null) {
            return false
        }

        if (isArray == true) {
            commit('addMessageArrayInctanceToProfile', {findedProfile, messageInstance})
        } else {
            commit('addMessageInctanceToProfile', {findedProfile, messageInstance})
        }

        return true
    },
    sortProfileMessages({ state, commit }, username) {
        let findedProfile = state.userListController.findProfile(username)
        if (findedProfile == undefined || findedProfile == null) {
            return false
        }

        commit('sortProfileMessages', {findedProfile})
        return true
    },
    addProfileToUserList({ state, commit}, profileJson) {
        commit('addProfileToUserListAndParse', profileJson)
        return true
    },
    addProfileInstanceToUserList({ state, commit}, profileInstance) {
        commit('addProfileInstanceToUserList', profileInstance)
        return true
    },
    addProfileToSearchList({ state, commit}, profileJson) {
        commit('addProfileToSearchListAndParse', profileJson)
        return true
    },
    setWebSocket({ state, commit}, webSocket) {
        commit('setSocket', webSocket)
        return true
    },
    getProfileByUsername: ({ state, commit }, username) => {
        return state.userListController.findProfile(username)
    },
    swapProfileToFront: ({ state, commit }, username) => {
        commit('swapProfileInFront', username)
    },
    getStatus({ state, commit }, status) {
        return state.statusMap.get(status)
    },
    setProfileStatus({ state, commit }, {username , status}) {
        let findedProfile = state.userListController.findProfile(username)
        if (findedProfile == undefined || findedProfile == null) {
            return false
        }

        commit('setStatus', { findedProfile, status })
        return true
    },
    addUnseenToProfile({ state, commit }, {username , unseenCount}) {
        let findedProfile = state.userListController.findProfile(username)
        if (findedProfile == undefined || findedProfile == null) {
            return false
        }

        commit('addUnseen', { findedProfile, unseenCount })
        return true
    },
    setObtainMessageStatus({ state, commit }, {username , obtainStatus}) {
        let findedProfile = state.userListController.findProfile(username)
        if (findedProfile == undefined || findedProfile == null) {
            return false
        }

        commit('setObtainedMessage', { findedProfile, obtainStatus })
        return true
    },
    setProfileLastMessage({ state, commit }, {username , lastMessage, isJson}) {
        let findedProfile = state.userListController.findProfile(username)
        if (findedProfile == undefined || findedProfile == null) {
            return false
        }

        commit('setProfileLastMessage', { findedProfile, lastMessage, isJson })
        return true
    },
    setValidationOfProfileImg({ state, commit }, {username, isValid}) {
        let findedProfile = state.userListController.findProfile(username)
        if (findedProfile == undefined || findedProfile == null) {
            return false
        }

        commit('setValidationOfProfileImg', { findedProfile, isValid })
        return true
    },
    seenProfileMessageWithID({ state, commit }, {username, messageUUID}) {
        let findedProfile = state.userListController.findProfile(username)
        if (findedProfile == undefined || findedProfile == null) {
            return false
        }

        commit('seenProfileMessageWithID', { findedProfile, messageUUID })
        return true
    },
    transferProfileFromSearchListToUserList({ state, commit }, { username }) {
        let findedProfile = state.searchListController.findProfile(username)
        if (findedProfile == undefined || findedProfile == null) {
            return false
        }

        commit('transferProfileFromSearchListToUserList', { findedProfile, username })
        return true
    },
    getProfileFromSearchList({ state, commit }, {username, transferToUserList }) {
        let findedProfile = state.searchListController.findProfile(username)
        if (findedProfile == undefined || findedProfile == null) {
            return false
        }

        if (transferToUserList) {
            commit('transferProfileFromSearchListToUserList', { findedProfile, username })
        }

        return findedProfile
    },
}


export default {
    state,
    getters,
    mutations,
    actions
}