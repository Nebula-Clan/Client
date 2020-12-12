<template>
  <v-card class="elevation-2">
    <div class="profile mb-10">
      <v-img
        class="white--text align-end custom-rounded"
        :src="this.$axios.defaults.baseURL + user.banner_picture"
        height="80px">
      </v-img>
      <nuxt-link :to="'/profile/'+user.username">
        <UserAvatar
          class="profile-pic"
          color="primary"
          :size="80"
          :avatar-string="user.username"
          :avatar-src="user.profile_picture"/>
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
    <v-divider class="primary"/>
    <v-row class="text-center pa-2 justify-space-around">
      <div>
        <b>{{ profileInfo.followings.length }}</b>
        <br>
        <span>Followings</span>
      </div>
      <div>
        <b>{{ profileInfo.posts.length }}</b>
        <br>
        <span>Posts</span>
      </div>
      <div>
        <b>{{ profileInfo.followers.length }}</b>
        <br>
        <span>Followers</span>
      </div>
    </v-row>
  </v-card>
</template>

<script>
  import {mapActions} from 'vuex'
  import UserAvatar from "../shared/UserAvatar";

  export default {
    name: "user.component",
    components: { UserAvatar },
    props: ['user'],
    data: () => {
      return {
        profileInfo: {
          posts: [],
          followers: [],
          followings: [],
        }
      }
    },
    mounted() {
      this.fetchFollowers();
      this.fetchFollowings();
      this.fetchPosts();
    },
    methods: {
      ...mapActions('modules/post', ['getPostByAuthor']),
      ...mapActions('modules/follow', ['getFollowers']),
      ...mapActions('modules/follow', ['getFollowings']),
      fetchFollowings() {
        this.getFollowings({
          username: this.$auth.user.username
        }).then(({ data }) => {
          this.profileInfo.followings = data.user_followings;
        }).catch((error) => {
          this.$notifier.showMessage({ content: error.message, color: 'error' })
        });
      },
      fetchFollowers() {
        this.getFollowers({
          username: this.$auth.user.username
        }).then(({ data }) => {
          this.profileInfo.followers = data.user_followers;
        }).catch((error) => {
          this.$notifier.showMessage({ content: error.message, color: 'error' })
        });
      },
      fetchPosts() {
        this.getPostByAuthor({
          username: this.$auth.user.username
        }).then(({ data }) => {
          this.profileInfo.posts = data.all_user_posts;
        }).catch((error) => {
          this.$notifier.showMessage({ content: error.message, color: 'error' })
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .profile {
    position: relative;

    .profile-pic {
      position: absolute;
      bottom: -40px;
      left: calc(50% - 56px);
    }

    .custom-rounded {
      border-radius: 5px 5px 0 0;
    }
  }

  b, span {
    font-size: x-small;
  }
</style>
