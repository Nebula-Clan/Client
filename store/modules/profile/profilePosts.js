import axios from 'axios'
import { Post } from './classes/post'

const state = () => ({
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
    }
}
  
const actions = {
    getProfilePosts({ commit }, user_id) {
        let data = {'user_id' : user_id}
        this.$axios.post('api/posts/get_user_posts', data)
        .then(function ({ data }) {
            commit('parsePostAndAppend', data.all_user_posts)
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}


export default {
    state,
    getters,
    mutations,
    actions
}