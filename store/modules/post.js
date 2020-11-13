import axios from 'axios'

const state = {
  isCommentToPostExpanded: false,
}

const getters = {
  isCommentToPostExpanded: state => state.isCommentToPostExpanded
}

const actions = {
  // Requests
  createPost({commit}, post) {
    let data = new FormData()
    data.append('title', post.title)
    data.append('description', post.description)
    data.append('content_type', post.contentType)
    data.append('category', post.category)
    data.append('content', post.content)
    data.append('header_image', post.headerImage)
    data.append('community_name', "Prog")

    return this.$axios.post('/api/posts/create_post', data)
  },
  getFullPost({commit}, postData) {
    return this.$axios.get('/api/posts/get_full_post', {
      params: {
        id: postData.id,
      }
    })
  },
  // Post view management
  setCommentToPost({commit}, status) {
    commit('setIsCommentToPostExpanded', !status);
  }
}

const mutations = {
  setIsCommentToPostExpanded: (state, status) => (state.isCommentToPostExpanded = status),
}

export default {
  state,
  getters,
  actions,
  mutations
}
