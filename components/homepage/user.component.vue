<template>
  <v-card class="elevation-10">
    <div class="profile mb-10">
      <v-img
            class="white--text align-end custom-rounded"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            height="80px">
      </v-img>
      <v-avatar
        class="profile-pic"
        size="80">
        <img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John">
      </v-avatar>
    </div>
    <v-card-title  class="justify-center">
      {{firstname}} {{lastname}}
    </v-card-title>
    <v-card-subtitle class="text-center">
      {{username}}
    </v-card-subtitle>
    <v-card-text class="text-center">
      <v-icon>mdi-format-quote-open</v-icon>{{bio}}<v-icon>mdi-format-quote-close</v-icon>
    </v-card-text>
    <v-divider></v-divider>
    <v-row class="text-center pa-2 justify-space-around">
      <div>
        <b>{{followings}}</b>
        <br>
        <span>Followings</span>
      </div>
      <div>
        <b>{{posts}}</b>
        <br>
        <span>Posts</span>
      </div>
      <div>
        <b>{{followers}}</b>
        <br>
        <span>Followers</span>
      </div>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "user.component",
  data: () => {
    return {
      username: 'amiresm',
      firstname: 'Amir',
      lastname: 'Esmaeili',
      bio: 'A sad middle eastern',
      followers: 100,
      followings: 343,
      posts: 1000
    }
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
