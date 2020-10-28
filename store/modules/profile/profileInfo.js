import axious from 'axios'

const state = () => ({
    info: {
        nickname: 'test',
        username: 'testU',
        description: 'testiiiii',
        numberOfPosts: 0,
        numberOfComments: 0,
        numberOfLikes: 2,
        numberOfFollowers: 0,
        numberOfFollowing: 0,
        profileImageUrl: '',
        profileBannerUrl: ''
    }
})
  
const getters = {
    getNickname: (state) => {
        return state.info.nickname
    },
    getUsername: (state) => {
        return state.info.username
    },
    getDescription: (state) => {
        return state.info.description
    },
    getNumberOfPosts: (state) => {
        return state.info.numberOfPosts
    },
    getNumberOfComments: (state) => {
        return state.info.numberOfComments
    },
    getNumberOfLikes: (state) => {
        return state.info.numberOfLikes
    },
    getNumberOfFollowers: (state) => {
        return state.info.numberOfFollowers
    },
    getNumberOfFollowing: (state) => {
        return state.info.numberOfFollowing
    }
}
  
const mutations = {

}
  
const actions = {

}


export default {
    state,
    getters,
    mutations,
    actions
}