import axious from 'axios'
import { Comment } from './classes/comment'
import { Post } from './classes/post'

const state = () => ({
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
    }
}

const actions = {
    getProfileComments({ commit }, username) {
        this.$axios.get('api/comments/profile/get?username=' + username)
        .then(function ({ data }) {
            commit('parseCommentReplyJsonReqAndAppend', data.comment_replies)
            commit('parsePostReplyJsonReqAndAppend', data.post_replies)
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
