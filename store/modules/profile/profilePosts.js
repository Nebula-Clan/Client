import axios from 'axios'
import { Post } from './classes/post'

const state = () => ({
    isReqSended: false,
    posts: []
})
  
const getters = {
    getPosts: (state) => {
        return state.posts
    },
}
  
const mutations = {
    parsePostAndAppend(state, postJsonArray) {
        console.log(postJsonArray)
        postJsonArray.forEach(postJson => {
            let post = new Post()
            post.parsePostFromJson(postJson)
            console.log(post)
            state.posts.push(post)
        });
    },
    sendedReq(state) {
        state.isReqSended = true
    },
    sortPostBasedOnDate(state) {
        state.posts.sort((a, b) => {
            return new Date(b.postDate) - new Date(a.postDate);
        })
    }
}
  
const actions = {
    getProfilePosts({ commit, state }, username) {
        if (state.isReqSended) {
            return
        }
        return this.$axios.get('api/posts/get_user_posts?username=' + username)
        .then(function ({ data }) {
            commit('sendedReq')
            commit('parsePostAndAppend', data.all_user_posts)
            commit('sortPostBasedOnDate')
        })
        .catch(function (error) {
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