import axios from 'axios'

const state = {
}

const getters = {
}

const actions = {
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
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
