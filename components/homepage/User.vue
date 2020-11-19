<template>
  <v-card class="elevation-2">
    <div class="profile mb-10">
      <v-img
        class="white--text align-end custom-rounded"
        :src="this.$axios.defaults.baseURL + user.banner_picture"
        height="80px">
      </v-img>
      <nuxt-link :to="'/profile/'+user.username">
      <v-avatar
        class="profile-pic"
        size="80">
        <img
          :src="this.$axios.defaults.baseURL + user.profile_picture"
          alt="John">
      </v-avatar>
      </nuxt-link>
    </div>
    <v-card-title class="justify-center">
      {{ user.first_name }} {{ user.last_name }}
    </v-card-title>
    <v-card-subtitle class="text-center">
      {{ user.username }}
    </v-card-subtitle>
    <v-card-text class="text-center">
      <v-icon>mdi-format-quote-open</v-icon>
      {{ user.biology }}
      <v-icon>mdi-format-quote-close</v-icon>
    </v-card-text>
    <v-divider class="primary"></v-divider>
    <v-row class="text-center pa-2 justify-space-around">
      <div>
        <b>{{ numberOfFollowings }}</b>
        <br>
        <span>Followings</span>
      </div>
      <div>
        <b>{{ numberOfPosts }}</b>
        <br>
        <span>Posts</span>
      </div>
      <div>
        <b>{{ numberOfFollowers }}</b>
        <br>
        <span>Followers</span>
      </div>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "user.component",
  props: ['user'],
  data: () => {
    return {
      numberOfPosts: 0,
      numberOfFollowers: 0,
      numberOfFollowings: 0,
    }
  },
  mounted() {
    this.getProfileInfo(this.user.username)
    .then((profile) => {
      this.numberOfPosts = profile.numberOfPosts
      this.numberOfFollowers = profile.numberOfFollowers
      this.numberOfFollowings = profile.numberOfFollowing
    })
    .catch((error) => {

    })
  },
  methods: {
    ...mapActions('modules/profile/profileInfo', ['getProfileInfo'])
  }
}
</script>

<style lang="scss" scoped>
.profile {
  position: relative;

  .profile-pic {
    position: absolute;
    bottom: -40px;
    left: calc(50% - 40px);
  }

  .custom-rounded {
    border-radius: 5px 5px 0 0;
  }
}

b, span {
  font-size: x-small;
}
</style>
