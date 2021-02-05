<template>
  <v-dialog
    persistent
    v-model="isDialogEnabled"
    scrollable
    max-width="450px">
    <v-card>
      <v-card-title>{{title}}</v-card-title>
      <v-divider class="my-2"/>
      <v-card-text style="max-height: 400px">

        <v-row v-for="(user, index) in userList" :key="index" align="center" justify="center" class="my-2">
          <UserAvatar
            size="50"
            color="primary"
            avatar-string="H"
            :avatar-src="user.profile_picture"/>
          <v-list-item-content class="ml-1">
            <nuxt-link :to="`/profile/${user.username}`" class="text-decoration-none">
              <v-list-item-title v-text="user.username"/>
            </nuxt-link>
            <v-list-item-subtitle class="mt-1" v-text="user.first_name + ' ' + user.last_name"/>
          </v-list-item-content>
          <v-spacer/>
          <v-btn
            width="100"
            outlined
            :loading="user.isFollowLoading"
            v-if="isNotCurrentUser(user.username)"
            @click="()=>{user.followed_by_viewer ? unfollow(user, index)  : follow(user, index)}"
            class="text-body-2 mr-4"
            :color="user.followed_by_viewer ? 'red' : 'accent'">
            {{user.followed_by_viewer ? "Unfollow" : "Follow"}}
          </v-btn>
          <div v-else class="text-header-4 text-center mr-14">You</div>
        </v-row>

      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn
          outlined
          color="primary"
          class="mr-4"
          text
          @click="closeFunc">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import UserAvatar from "./UserAvatar";
  import {mapActions} from "vuex";

  export default {
    name: "ListDialog",
    components: { UserAvatar },
    mounted() {
      this.$forceUpdate();
      console.log("created");
      console.log(this.userList)
    },
    methods: {
      isNotCurrentUser(username) {
        return this.$auth.user.username !== username;
      },
      ...mapActions('modules/follow', ['followUser']),
      ...mapActions('modules/follow', ['unfollowUser']),
      ...mapActions('modules/follow', ['getFollowers']),
      follow(user, index) {
        this.userList[index].isFollowLoading = true;
        this.$forceUpdate();
        this.followUser({
          username: user.username
        }).then(({ data }) => {
          this.$notifier.showMessage({ content: "Followed", color: 'success' });
          this.userList[index].isFollowLoading = false;
          this.userList[index].followed_by_viewer = !this.userList[index].followed_by_viewer;
          this.$forceUpdate();
        }).catch((error) => {
          this.$notifier.showMessage({ content: error.message, color: 'error' })
        })
      },
      unfollow(user, index) {
        this.userList[index].isFollowLoading = true;
        this.$forceUpdate();
        this.unfollowUser({
          username: user.username
        }).then(({ data }) => {
          this.$notifier.showMessage({ content: "Unfollowed", color: 'success' });
          this.userList[index].isFollowLoading = false;
          this.userList[index].followed_by_viewer = !this.userList[index].followed_by_viewer;
          this.$forceUpdate();
        }).catch((error) => {
          this.$notifier.showMessage({ content: error.message, color: 'error' })
        })
      },
      // route: function(username) {
      //   window.open(`http://localhost:3000/profile/${username}`, '_self');
      // }
    },
    props: ['title', 'isDialogEnabled', 'userList', 'closeFunc']
  }
</script>

<style scoped>
  .tab-stick {
    top: 0;
    position: sticky;
    position: -webkit-sticky;
    z-index: 5;
  }


  ::-webkit-scrollbar {
    width: 8px;
    height: 3px;
  }

  ::-webkit-scrollbar-button {
    background-color: #00000000;
  }

  ::-webkit-scrollbar-track {
    background-color: #646464;
  }

  ::-webkit-scrollbar-track-piece {
    background-color: #000;
  }

  ::-webkit-scrollbar-thumb {
    height: 50px;
    background-color: #666;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-corner {
    background-color: #646464;
  }

  ::-webkit-resizer {
    background-color: #666;
  }

</style>
