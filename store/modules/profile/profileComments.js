import axious from 'axios'
import { Comment } from './classes/comment'

const state = () => ({
    comments: []
})

const getters = {
    getComments: (state) => {
        return state.comments
    },
}

const mutations = {
    parseJsonReqAndAppend(state, commentJsonArray) {
        console.log(commentJsonArray)
        commentJsonArray.forEach(commendJson => {
            let comment = new Comment()
            comment.parseCommentFromJson(commendJson)
            state.comments.push(comment)
        })
    }
}

const actions = {
    getProfileComments({ commit }, username) {
        let data = {'username' : username}
        this.$axios.post('api/comments/profile/get', data)
        .then(function ({ data }) {
            console.log(data)
            commit('parseJsonReqAndAppend', data.post_replies.post)
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
