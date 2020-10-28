import axious from 'axios'
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

}
  
const actions = {

}


export default {
    state,
    getters,
    mutations,
    actions
}