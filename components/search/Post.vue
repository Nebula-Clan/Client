<template>
  <v-card elevation="2" class="pa-4 my-2">
    <v-row>
      <v-col>
        <h1>{{postDet.title}}</h1>
      </v-col>
      <v-col class="text-right">
        <v-icon size="15">
          mdi-clock
        </v-icon>
        <span style="font-size: smaller">{{ dateDuration }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="2" cols="12">
        <img class="post-img" src="../../static/images/unnamed.jpg" alt="">
      </v-col>
      <v-col md="10" cols="12">
        {{postDet.description.substring(0, 250) + '...'}}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex">
        <v-chip
          small
          nuxt
          :key="i"
          v-for="(tag, i) in postDet.hashtags"
          :to="'/search/hashtag?keyword=' + tag.replace('#', '') + '&sort=latest'"
          outlined
          class="mx-1"
          :color="chipsColors[i]"
        >
          {{tag}}
        </v-chip>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex">
        <v-avatar>
          <img :src="postDet.author.profile" :alt="postDet.author.username"/>
        </v-avatar>
        <div class="ml-2">
          <nuxt-link :to="'/profile/'+postDet.author.username" class="text-decoration-none white--text">
            <span><b>{{postDet.author.username}}</b></span>
          </nuxt-link>
          <br>
          <span>{{postDet.author.first_name}} {{postDet.author.last_name}}</span>
        </div>
      </v-col>
      <v-col class="d-flex justify-end align-end"  style="font-size: small">
        <div class="mx-2">
          <v-icon
            color="red">
            mdi-heart
          </v-icon>
          <br>
          <span>{{postDet.likes}}</span>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      chipsColors: [
        'blue', 'red', 'green', 'purple', 'orange'
      ],
      postDet: {
        author: {
          username: 'amiresm',
          first_name: 'Amir',
          last_name: 'Esmaeili',
          profile: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?cs=srgb&dl=pexels-spencer-selover-428364.jpg&fm=jpg'
        },
        date_created: '2020-11-05 17:42:00',
        title: 'This is title',
        description: 'This is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for youThis is a description for you',
        hashtags: ['#Django', '#Backend'],
        likes: 120,
        comments: 10
      }
    }
  },
  computed: {
    dateDuration: {
      get: function () {
        const unixTime = new Date(this.postDet.date_created).getTime()
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
