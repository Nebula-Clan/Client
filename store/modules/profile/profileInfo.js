import axios from 'axios'

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
    // info: {
    //     nickname: 'test',
    //     username: 'testU',
    //     description: 'testiiiii',
    //     numberOfPosts: 0,
    //     numberOfComments: 0,
    //     numberOfLikes: 2,
    //     numberOfFollowers: 0,
    //     numberOfFollowing: 0,
    //     profileImageUrl: '',
    //     profileBannerUrl: ''
    // }
    parseReq(state, data) {
        state.info.nickname = data.first_name
        state.info.username = data.username
        state.info.description = data.biology
        state.info.profileImageUrl = data.profile_picture
    }
}
  
const actions = {
    async getProfileInfo ({ commit }, username) {
        let user = new FormData()
        user.append('username', username)
        try {
            let { data } = await this.$axios.post('api/profile/public',  user)
            commit('parseReq', data)
        } catch (e) {
          console.log(e)
        }
      }
}


export default {
    state,
    getters,
    mutations,
    actions
}