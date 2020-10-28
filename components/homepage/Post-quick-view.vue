<template>
  <v-card class="my-2 pa-3" elevation="2">
    <v-row>
      <v-col class="d-flex">
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
          <span><b>{{ user.username }}</b></span>
          <span style="font-size: smaller">{{ user.firstname }} {{ user.lastname }}</span>
        </div>
      </v-col>
      <v-col class="text-right align-center d-flex justify-end">
        <div class="mr-2">
          <v-icon size="15">
            mdi-clock
          </v-icon>
          <span style="font-size: smaller">{{ timeCalculator() }}</span>
        </div>
      </v-col>
    </v-row>
<!--    <hr>-->
    <v-row>
      <v-col class="px-10">
        <div v-html="postHtml">
        </div>
        <nuxt-link to="#">read more</nuxt-link>
      </v-col>
    </v-row>
    <hr style=" width: 70%; text-align: center; margin: 10px auto auto;">
    <v-row>
      <v-col>
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
      <v-col class="text-right">
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
  data: () => {
    return {
      postHtml: `
<h1>This is a sample post</h1>
<h2>Let's talk about things</h2>
<p>Cool, new Pizza ...</p>
<h2>Let's plan</h2>
<p>Somewhere...</p>
      `,
      user: {
        username: 'amiresm',
        firstname: 'Amir',
        lastname: 'Esmaeili',
      },
      time: new Date('2020-10-28 20:40:10'),
      duration: '1'
    }
  },
  methods: {
    timeCalculator () {
      const unixTime = this.time.getTime()
      const now = new Date().getTime()
      if (now - unixTime < 36e+5) {
        return Math.floor((now - unixTime) / 60000) + ' m'
      } else if (now - unixTime > 36e+5 && now - unixTime < 36e+5 * 24) {
        return Math.floor((now - unixTime) / 36e+5) + ' h'
      } else {
        return Math.floor((now - unixTime) / 36e+5 * 24) + ' day(s)'
      }
    }
  }
}
</script>

<style scoped>

</style>
