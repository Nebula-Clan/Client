import axious from 'axios'
import { Like } from './classes/like'
import { Post } from './classes/post'
import { Profile } from './classes/profile'
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
    },
    getProfilesThatLikedPostByID({ commit }, postID) {
        return this.$axios.get('api/likes/post/get', {
            params: {
                'id': postID
            }
        })
        .then(({ data }) => {
            let users = data.liked_users
            let profiles = []
            users.forEach((profileJson) => {
                let profile = new Profile()
                profile.parseFromJson(profileJson)
                profiles.push(profile)
            })
            return profiles
        })
        .catch((error) => {
            throw error
        })
    },
    getProfilesThatLikedCommentByID({ commit }, commentID) {

    },
    submitLikeAtPostWithID({ commit }, postID) {
        return this.$axios.post('api/likes/post/submit', {
            'post_id' : postID
        })
    },
    deleteLikeAtPostWithID({ commit }, postID) {
        let data = {"id" : postID}
        return this.$axios.$request({
            url: 'api/likes/post/delete',
            method: 'delete',
            data: data
        })
    },
    submitLikeAtCommentWithID({ commit }, commentID) {
        return this.$axios.post('api/likes/comment/submit', {
            "comment_id": commentID
        })
    },
    deleteLikeAtCommentWithID({ commit }, commentID) {
        let data = {"id" : commentID}
        return this.$axios.$request({
            url: 'api/likes/comment/delete',
            method: 'delete',
            data: data
        })
    }
}


export default {
    state,
    getters,
    mutations,
    actions
}
