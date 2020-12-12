<template>
  <v-row :class="[marginSize, avatar]" max-width="250">
    <v-col cols="12">
      <Avatar class="avatar-border" :substituteChar="firstCharOfProfileNickname" :avatarUrl="getProfileImage"
              :timeOut="12000" :avatarSize="avatarSize" :textSize="textClassForError"/>
    </v-col>
    <v-col cols="12" class="pb-0 ml-5">
      <v-row>
        <div class="text-h6">
          {{ profile.nickname }}
        </div>
        <v-btn
          v-if="this.$route.params.username !== this.$auth.user.username"
          depressed
          class="ml-auto mr-10"
          color="blue darken-1"
          @click="()=>{isFollowing ? unfollow()  : follow()}"
          :loading="isFollowLoading">
          {{isFollowing ? "Unfollow" : "Follow"}}
        </v-btn>
      </v-row>
    </v-col>
    <v-col cols="12" class="pt-0 ml-2 pb-0">
      <div class="text-caption text--secondary">
        {{profile.username }}
      </div>
    </v-col>
    <v-col cols="12" class="ml-2">
      <div class="text-caption">
        {{ profile.description }}
      </div>
    </v-col>
  </v-row>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  import Avatar from '~/components/shared/Avatar'

  export default {
    data: () => {
      return {
        avatarClass: "avatar-lg",
        isFollowLoading: true,
        isFollowing: false,
        isCompleted: false,
        hasError: false,
        showImageByName: false,
        errorTime: null
      }
    },
    computed: {
      ...mapGetters('modules/profile/profileInfo', ['getProfile', 'getStatusOfReq']),
      profile() {
        return this.getProfile
      },
      avatar() {
        if (this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl) {
          return 'avatar-lg'
        } else if (this.$vuetify.breakpoint.md) {
          return 'avatar-md'
        } else {
          return 'avatar-sm'
        }
      },
      avatarSize() {
        if (this.$vuetify.breakpoint.xl || this.$vuetify.breakpoint.lg) {
          return 180
        } else if (this.$vuetify.breakpoint.md) {
          return 150
        } else if (this.$vuetify.breakpoint.sm) {
          return 100
        } else if (this.$vuetify.breakpoint.xs) {
          return 100
        }
      },
      marginSize() {
        if (this.$vuetify.breakpoint.xl) {
          return 'ml-16'
        } else if (this.$vuetify.breakpoint.lg) {
          return 'ml-8'
        } else if (this.$vuetify.breakpoint.md) {
          return 'ml-10'
        } else if (this.$vuetify.breakpoint.sm) {
          return 'ml-8'
        } else if (this.$vuetify.breakpoint.xs) {
          return 'ml-2'
        }
      },
      classForImageError() {
        if (this.showImageByName) {
          return {
            'background-color': '#0D47A1'
          }
        }
        return ''
      },
      textClassForError() {
        if ((this.$vuetify.breakpoint.md || this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs)) {
          return 3
        }
        return 2
      },
      firstCharOfProfileNickname() {
        return this.profile.nickname.slice(0, 1).toUpperCase()
      },
      watchReqUntilCompleted() {
        if (this.getStatusOfReq) {
          console.log('done')
          this.errorTime = setTimeout(() => {
            this.hasError = true
          }, 12000)
          this.isCompleted = true
        }
        return this.isCompleted
      },
      getProfileImage() {
        return this.$axios.defaults.baseURL + this.profile.profileImageUrl
      }
    },
    mounted() {
      this.updateIsFollowing();
    },
    methods: {
      ...mapActions('modules/follow', ['followUser']),
      ...mapActions('modules/follow', ['unfollowUser']),
      ...mapActions('modules/follow', ['getFollowings']),
      follow() {
        this.isFollowLoading = true;
        this.followUser({
          username: this.profile.username
        }).then(({ data }) => {
          this.$notifier.showMessage({ content: "Followed", color: 'success' });
          this.updateIsFollowing();
        }).catch((error) => {
          this.$notifier.showMessage({ content: error.message, color: 'error' })
        })
      },
      unfollow() {
        this.isFollowLoading = true;
        this.unfollowUser({
          username: this.profile.username
        }).then(({ data }) => {
          console.log(data);
          this.$notifier.showMessage({ content: "Unfollowed", color: 'success' });
          this.updateIsFollowing();
        }).catch((error) => {
          this.$notifier.showMessage({ content: error.message, color: 'error' })
        })
      },
      updateIsFollowing() {
        this.getFollowings({
          username: this.$route.params.username
        }).then(({ data }) => {
          console.log(data);
          let followersUsername = data.user_followers.map((user) => user.username);
          this.isFollowing = followersUsername.includes(this.$auth.user.username);
          this.isFollowLoading = false;
        }).catch((error) => {
          this.$notifier.showMessage({ content: error.message, color: 'error' })
        });
      },
      imageLoaded(event) {
        if (this.errorTime) {
          clearTimeout(this.errorTime)
          this.errorTime = null
        }
      }
    }
  }
</script>

<style scoped>

  .avatar-lg {
    margin-top: -200px;
  }

  .avatar-md {
    margin-top: 0px;
  }

  .avatar-sm {
    margin-top: 0px;
  }

  .avatar-sm {
    margin-top: 0px;
  }

  .avatar-border {
    border: 5px solid #12232E;
  }

</style>
