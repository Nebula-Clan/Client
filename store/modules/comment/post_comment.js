import axios from 'axios'

const DEFAULT_OPTIONS = {
  START_INDEX: 0,
  MAX_LENGTH: 100,
  REPLAY_DEPTH: 100,
  MAX_REPLAY_LENGTH: 100,
};

const state = {};

const getters = {};

const actions = {
  getComments({ commit }, data) {
    return this.$axios.get('/api/comments/post/get', {
        params: {
          "post_id": data.postId,
          "start_index": DEFAULT_OPTIONS.START_INDEX,
          "max_len": DEFAULT_OPTIONS.MAX_LENGTH,
          "depth": DEFAULT_OPTIONS.REPLAY_DEPTH,
          "max_reply_len": DEFAULT_OPTIONS.MAX_REPLAY_LENGTH
        }
      }
    )
  },
  getRepliesComments({ commit }, data) {
    return this.$axios.get('/api/comments/reply/get', {
        params: {
          "reply_to": data.commentId,
          "start_index": DEFAULT_OPTIONS.START_INDEX,
          "max_len": DEFAULT_OPTIONS.MAX_LENGTH,
          "depth": DEFAULT_OPTIONS.REPLAY_DEPTH,
          "max_reply_len": DEFAULT_OPTIONS.MAX_REPLAY_LENGTH
        }
      }
    )
  },
  replyToComment({ commit }, data) {
    return this.$axios.$post('/api/comments/reply/submit', {
        reply_to_id: data.commentId,
        content: data.content,
      }
    )
  },
  likeComment({ commit }, data) {
    return this.$axios.$post('/api/likes/comment/submit', {
        comment_id: data.commentId
      }
    )
  },
  dislikeComment({ commit }, data) {
    return this.$axios.$request({
        url: 'api/likes/comment/delete',
        method: 'delete',
        data: { id: data.commentId }
      }
    )
  },
  replyToPost({ commit }, data) {
    return this.$axios.$post('/api/comments/reply/submit', {
        reply_to_id: data.commentId,
        content: data.content,
      }
    )
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
}
