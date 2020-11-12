<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>#{{hashtag}}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="8" v-if="posts">
        <Post
          :key="post.id"
          :post="post"
          v-for="post in posts"/>
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
      sort: this.$route.query.sort,
      posts: []
    }
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      this.$axios.get(`api/hashtag/posts?text=${this.hashtag}`).then(
        response =>
          this.posts = response.data.posts
      ).catch(
        error => console.log(error)
      );
    }
  },
  watch: {
    '$route.query.keyword': function () {
      this.hashtag = this.$route.query.keyword
      this.getPosts();
    }
  }
}
</script>

<style scoped>

</style>
