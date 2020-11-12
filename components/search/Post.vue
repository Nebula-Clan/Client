<template>
  <v-card elevation="2" class="px-4 my-2">
    <v-row>
      <v-col>
        <h1>{{post.title}}</h1>
        <div>
          <v-icon size="15">
            mdi-clock
          </v-icon>
          <span style="font-size: smaller">{{ dateDuration }}</span>
        </div>
      </v-col>
      <v-col class="text-right">

        <div>
          <v-btn icon>
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-if="post.header_image"
        md="2"
        cols="12">
        <img
          class="post-img"
          :src="$axios.defaults.baseURL + post.header_image" alt="">
      </v-col>
      <v-col md="10" cols="12">
        {{post.description.substring(0, 250) + '...'}}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex">
        <v-chip
          small
          nuxt
          :key="i"
          v-for="(tag, i) in post.hashtags"
          :to="'/search/hashtag?keyword=' + tag.text + '&sort=latest'"
          outlined
          class="mx-1"
          :color="chipsColors[i]">
          #{{tag.text}}
        </v-chip>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex">
        <v-avatar>
          <img :src="$axios.defaults.baseURL + post.author.profile_picture"
               :alt="post.author.username"/>
        </v-avatar>
        <div class="ml-2">
          <nuxt-link :to="'/profile/'+post.author.username"
                     class="text-decoration-none white--text">
            <span><b>{{post.author.username}}</b></span>
          </nuxt-link>
          <br>
          <span>{{post.author.first_name}} {{post.author.last_name}}</span>
        </div>
      </v-col>
      <v-col class="d-flex justify-end align-end"  style="font-size: small">
        <div class="mx-2">
          <v-icon
            color='red'>
            mdi-heart
          </v-icon>
          <span>{{post.likes_number}}</span>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Post",
  props: ['post'],
  data() {
    return {
      chipsColors: [
        'blue', 'red', 'green', 'purple', 'orange'
      ],
    }
  },
  computed: {
    dateDuration: {
      get: function () {
        const unixTime = new Date(this.post.date_created).getTime()
        const now = new Date().getTime()
        if (now - unixTime < 36e+5) {
          return Math.floor((now - unixTime) / 60000) + ' m'
        } else if (now - unixTime > 36e+5 && now - unixTime < 36e+5 * 24) {
          return Math.floor((now - unixTime) / 36e+5) + ' h'
        } else {
          return Math.floor((now - unixTime) / (36e+5 * 24)) + ' day(s)'
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .post-img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
  }
</style>
