import axious from 'axios'
import { Profile } from '~/store/modules/profile/classes/profile'
import { ChatProfile } from './models/chatprofile'

const state = () => ({
    results: [],
    is_filled: false
})

const getters = {
    getResults: (state) => {
        return state.results
    }
}

const mutations = {
    addProfileToResults(state, chatProfile) {
        state.results.push(chatProfile)
    },
    getProfileIndex(state, chatProfile) {
        let profileIndex = state.results.findIndex((profile) => {
            return profile.username === chatProfile.username
        })
        if (profileIndex === -1) {
            return -1
        }
        return profileIndex
    },
    deleteProfileFromResults(state, chatProfileIndex) {
        state.results.splice(chatProfileIndex, 1);
    },
    clearResults(state) {
        state.results = []
        state.is_filled = false
    },
    setResults(state, chatProfileArray) {
        state.results = chatProfileArray
        state.is_filled = true
    }
}

const actions = {
    serachWithUsername({state, commit}, username) {
        return this.$axios.get('api/search/search_in_users', {
            params: {
                'key': username
            }
        })
        .then(({ data }) => {
            let users = data.users_finded
            let found_profiles = []
            users.forEach((profileJson) => {
                let profile = new Profile()
                profile.parseFromJson(profileJson)
                found_profiles.push(convertToChatProfile(profile))
            })
            if (state.is_filled) {
                commit('clearResults')
            }
            commit('setResults', found_profiles)

            return state.results
        })
        .catch((error) => {
            console.log(error)
            throw error
        })
    }
}

const convertToChatProfile = (profileInstance) => {
    let convertedProfile = new ChatProfile()
    convertedProfile.profileID = profileInstance.profileID
    convertedProfile.username = profileInstance.username
    convertedProfile.firstname = profileInstance.firstname
    convertedProfile.lastname = profileInstance.lastname
    convertedProfile.description = profileInstance.description
    convertedProfile.profileImageUrl = profileInstance.profileImageUrl
    convertedProfile.profileBannerUrl = profileInstance.profileBannerUrl

    return convertedProfile
}

export default {
    state,
    getters,
    mutations,
    actions
}
