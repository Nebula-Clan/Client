const state = {};

const getters = {};

const actions = {
  // Requests
  followUser({ commit }, data) {
    return this.$axios.post('api/follow/send_follow', {
      to_follow: data.username,
    });
  },
  unfollowUser({ commit }, data) {
    return this.$axios.delete('api/follow/send_unfollow', {
      params: {
        to_unfollow: data.username,
      }
    });
  },
  getFollowers({ commit }, data) {
    return this.$axios.get('api/follow/user_followings', {
      params: {
        username: data.username,
      }
    });
  },
  getFollowings({ commit }, data) {
    return this.$axios.get('api/follow/user_followers', {
      params: {
        username: data.username,
      }
    });
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
}
