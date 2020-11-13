import axious from 'axios'
import { Like } from './classes/like'
import { Post } from './classes/post'
import { Comment } from './classes/comment'

const state = () => ({
    isReqSended: false,
    likes: []
})

const getters = {
    getLikes: (state) => {
        return state.likes
    },
}

const mutations = {
    parseCommentReplyJsonReqAndAppend(state, commentJsonArray, username) {
        commentJsonArray.forEach(likeJson => {
            let like = new Like()
            like.likeOwnerUsername = username
            like.typeOfLike = 'Comment'
            let commentReply = new Comment()
            commentReply.parseCommentFromJson(likeJson)
            like.likeReply = commentReply
            state.likes.push(like)
        })
    },
    parsePostReplyJsonReqAndAppend(state, commentJsonArray, username) {
        commentJsonArray.forEach(likeJson => {
            let like = new Like()
            like.likeOwnerUsername = username
            like.typeOfLike = 'Post'
            let postReply = new Post()
            postReply.parsePostFromJson(likeJson)
            like.likeReply = postReply
            state.likes.push(like)
        })
    },
    reqSended(state, status) {
        state.isReqSended = status
    }
}

const actions = {
    getProfileLikes({ commit, state }, username) {
        if (state.isReqSended) {
            return
        }
        return this.$axios.get('api/likes/profile/get', {
            params: {
                username: username
            }
        })
        .then(function ({ data }) {
            console.log(data)
            commit('parsePostReplyJsonReqAndAppend', data.post_likes, username)
            commit('parseCommentReplyJsonReqAndAppend', data.comment_likes, username)
            commit('reqSended', true)
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
