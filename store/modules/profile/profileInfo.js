import axios from 'axios'

const state = () => ({
    info: {
        id: 0,
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
    },
    getProfileImage: (state) => {
        return state.info.profileImageUrl
    },
    getProfileBannerImage: (state) => {
        return state.info.profileBannerUrl
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
        state.info.nickname = data.nickname
        state.info.username = data.username
        state.info.description = data.biology
        state.info.profileImageUrl = data.profile_picture
        state.info.profileBannerUrl = data.banner_picture
        state.info.numberOfLikes = data.likes_count
        state.info.numberOfComments = data.comments_count
        state.info.numberOfFollowers = data.follower
        state.info.numberOfPosts = data.posts_count
        state.info.id = data.id
    }
}
  
const actions = {
    async getProfileInfo ({ commit }, username) {
        let user = new FormData()
        user.append('username', username)
        try {
            let { data } = await this.$axios.get('api/profile/public?username=' + username)
            console.log(data)
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