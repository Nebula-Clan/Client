import axios from 'axios'

const state = {}

const getters = {}

const actions = {
  async createPost ({ commit }, post) {
    // prepare data
    let data = new FormData()
    data.append('title', post.title)
    data.append('description', post.description)
    data.append('content_type', post.contentType)
    data.append('category', post.category)
    data.append('content', post.content)
    data.append('header_image', post.headerImage)
    try {
      const response = await this.$axios.post('/posts/create_post', data)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
