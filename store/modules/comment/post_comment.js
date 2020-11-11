import axios from 'axios'

const DEFAULT_OPTIONS = {
  START_INDEX: 0,
  MAX_LENGTH: 100,
  REPLAY_DEPTH: 100,
  MAX_REPLAY_LENGTH: 100,
}

const state = {}

const getters = {}

const actions = {
  getComments({commit}, data) {
    return this.$axios.$get('/api/comments/post/get', {
        params: {
          "post_id": data.postId,
          "start_index": DEFAULT_OPTIONS.START_INDEX,
          "max_len": DEFAULT_OPTIONS.MAX_LENGTH,
          "depth": DEFAULT_OPTIONS.REPLAY_DEPTH,
          "max_reply_len": DEFAULT_OPTIONS.MAX_REPLAY_LENGTH
        }
      }
    )
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
