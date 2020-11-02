import axios from 'axios'

const state = {}

const getters = {}

const actions = {
  createPost ({ commit }, post) {
    let data = new FormData()
    data.append('title', post.title)
    data.append('description', post.description)
    data.append('content_type', post.contentType)
    data.append('category', post.category)
    data.append('content', post.content)
    data.append('header_image', post.headerImage)

    return this.$axios.post('/api/posts/create_post', data)
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
