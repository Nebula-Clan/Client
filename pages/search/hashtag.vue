<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>#{{hashtag}}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="8">
        <Post/>
        <Post/>
        <Post/>
      </v-col>
      <v-col md="4">
        <Settings/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Post from "~/components/search/Post"
import Settings from "@/components/search/Settings";
export default {
  name: "hashtag",
  components: {
    Settings,
    Post
  },
  data() {
    return {
      hashtag: this.$route.query.keyword,
      sort: this.$route.query.sort
    }
  },
  mounted() {
  },
  watchQuery: true
}
</script>

<style scoped>

</style>
