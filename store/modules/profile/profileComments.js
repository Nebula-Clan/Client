import axious from 'axios'
import { Comment } from './classes/Comment'

const state = () => ({
    comments: [new Comment(), ]
})
  
const getters = {
    getComments: (state) => {
        return state.comments
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