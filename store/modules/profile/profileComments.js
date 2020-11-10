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
        commentJsonArray.forEach(commendJson => {
            let comment = new Comment()
            comment.parseCommentFromJson(commendJson.user_comment)
            state.comments.push(comment)
        })
    }
}

const actions = {
    getProfileComments({ commit }, username) {
        this.$axios.get('api/comments/profile/get?username=' + username)
        .then(function ({ data }) {
            console.log(data.post_replies)
            commit('parseJsonReqAndAppend', data.post_replies)
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
