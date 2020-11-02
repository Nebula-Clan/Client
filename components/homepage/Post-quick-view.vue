<template>
  <v-card class="my-2 pa-3" elevation="2">

    <v-row>
      <v-col class="ml-5">
        <nuxt-link class="text-decoration-none white--text" to="#">
          <h2>{{ post.title }}</h2>
        </nuxt-link>
        <div class="mr-2">
          <v-icon size="15">
            mdi-clock
          </v-icon>
          <span style="font-size: smaller">{{ dateDuration }}</span>
        </div>
      </v-col>

      <v-col
        class="text-right"
        cols="2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <span>More</span>
        </v-tooltip>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="mx-5 header-image">
        <img alt="image"
             :src="'http://huddle.pythonanywhere.com/' + post.header_image">
      </v-col>
    </v-row>

    <v-row>
      <v-col class="mx-5">
        <p>{{ post.description }}</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex mx-5">
        <div>
          <v-avatar
            class="profile-pic"
            size="50">
            <img
              alt="John"
              src="https://cdn.vuetifyjs.com/images/john.jpg">
          </v-avatar>
        </div>
        <div class="d-flex flex-column ml-3">
          <span><b>{{ author.username }}</b></span>
          <span style="font-size: smaller">{{ author.first_name }} {{ author.last_name }}</span>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-right mx-5">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </template>
          <span>Like</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon>
              <v-icon>mdi-comment</v-icon>
            </v-btn>
          </template>
          <span>Comment</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'Post-quick-view',
  props: ['post', 'author'],
  data: () => {
    return {
      // author: this.post.author,
      // postDetail: this.post.post
      // author: {
      //   username: 'amiresm',
      //   firstname: 'Amir',
      //   lastname: 'Esmaeili'
      // },
      // post: {
      //   title: 'An Interesting title',
      //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio sit amet nulla porta pharetra. Cras sed mollis purus. Aliquam sit amet urna id felis convallis porta eu vitae urna.',
      //   date_created: '2020-10-31T12:16:36Z'
      // }
    }
  },
  methods: {},
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
  }
}
</script>

<style lang="scss" scoped>
.header-image {
  text-align: center;

  img {
    width: 100%;
    height: 250px;
    border-radius: 5px;
  }
}
</style>
