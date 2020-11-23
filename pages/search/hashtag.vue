<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>#{{hashtag}}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="8" v-if="posts">
        <PostQuickView
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
import Settings from "@/components/search/Settings";
import PostQuickView from '@/components/shared/Post-quick-view'
export default {
  name: "hashtag",
  components: {
    Settings,
    PostQuickView
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
      this.$axios.get(`api/hashtag/posts?text=${this.hashtag}&sort=${this.sort}`).then(
        response =>
          this.posts = response.data.posts
      ).catch(
        e => this.$notifier.showMessage({content: e.message, color: 'error'})
      );
    }
  },
  watch: {
    '$route.query.keyword': function () {
      this.hashtag = this.$route.query.keyword
      this.getPosts();
    },
    '$route.query.sort': function () {
      this.sort = this.$route.query.sort
      this.getPosts();
    }
  }
}
</script>

<style scoped>

</style>
