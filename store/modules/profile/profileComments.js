import axious from 'axios'
import { Comment } from './classes/comment'
import { Post } from './classes/post'

const state = () => ({
    isReqSended: false,
    comments: []
})

const getters = {
    getComments: (state) => {
        return state.comments
    },
}

const mutations = {
    parseCommentReplyJsonReqAndAppend(state, commentJsonArray) {
        commentJsonArray.forEach(commentJson => {
            let comment = new Comment()
            comment.parseCommentFromJson(commentJson.user_comment)
            comment.commentTypeOfReply = 'Comment'
            let commentReply = new Comment()
            commentReply.parseCommentFromJson(commentJson.parent_comment.comment)
            comment.commentReply = commentReply
            state.comments.push(comment)
        })
    },
    parsePostReplyJsonReqAndAppend(state, commentJsonArray) {
        commentJsonArray.forEach(commentJson => {
            let comment = new Comment()
            comment.parseCommentFromJson(commentJson.user_comment)
            comment.commentTypeOfReply = 'Post'
            let postReply = new Post()
            postReply.parsePostFromJson(commentJson.post)
            comment.commentReply = postReply
            state.comments.push(comment)
        })
    },
    reqSended(state, status) {
        state.isReqSended = status
    },
    sortCommentsBasedOnDate(state) {
        state.comments.sort((a, b) => {
            return new Date(b.commentDate) - new Date(a.commentDate);
        })
    }
}

const actions = {
    getProfileComments({ commit, state }, username) {
        if (state.isReqSended) {
            return
        }
        return this.$axios.get('api/comments/profile/get?username=' + username)
        .then(function ({ data }) {
            commit('parseCommentReplyJsonReqAndAppend', data.comment_replies)
            commit('parsePostReplyJsonReqAndAppend', data.post_replies)
            commit('reqSended', true)
            commit('sortCommentsBasedOnDate')
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
