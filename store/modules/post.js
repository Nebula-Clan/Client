const state = {
  isCommentToPostExpanded: false,
};

const getters = {
  isCommentToPostExpanded: state => state.isCommentToPostExpanded
};

const actions = {
  // Requests
  createPost({commit}, post) {
    let data = new FormData();
    data.append('title', post.title);
    data.append('description', post.description);
    data.append('content_type', post.contentType);
    data.append('category', post.category);
    data.append('content', post.content);
    data.append('header_image', post.headerImage);
    data.append('community_name', post.communityName);
    post.hashtags.map(h => data.append('hashtags', h));

    return this.$axios.post('/api/posts/create_post', data)
  },
  getFullPost({commit}, postData) {
    return this.$axios.get('/api/posts/get_full_post', {
      params: {
        id: postData.id,
      }
    })
  },
  getPostByAuthor({commit}, data) {
    return this.$axios.get('/api/posts/get_user_posts', {
      params: {
        username: data.username,
      }
    })
  },
  // Post view management
  setCommentToPost({commit}, status) {
    commit('setIsCommentToPostExpanded', !status);
  },
  // Likes
  likePost({ commit }, data) {
    return this.$axios.post('api/likes/post/submit', {
      'post_id' : data.postId
    })
  },
  dislikePost({ commit }, data) {
    return this.$axios.$request({
      url: 'api/likes/post/delete',
      method: 'delete',
      data: {"id" : data.postId}
    })
  },
};

const mutations = {
  setIsCommentToPostExpanded: (state, status) => (state.isCommentToPostExpanded = status),
};

export default {
  state,
  getters,
  actions,
  mutations
}
