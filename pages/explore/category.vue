<template>
  <v-container>
    <v-row class="primary darken-3">
      <v-col class="text-left text-h4">
        <v-icon class="text-h3 mr-2 mb-2" v-if="posts.length !== 0" v-text="posts[0].category.icon"/>
        {{ category }}
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
  import post from "../../store/modules/post";

  export default {
    name: "category",
    components: {
      Settings,
      PostQuickView
    },
    data() {
      return {
        category: this.$route.query.category,
        order: this.$route.query.order,
        posts: []
      }
    },
    mounted() {
      this.fetchPosts();
    },
    methods: {
      fetchPosts() {
        this.$axios.get('api/posts/home_posts', {
          params: {
            order_key: this.$route.query.sort,
            category_filter: this.$route.query.category,
          }
        }).then(({ data }) => {
            this.posts = data.posts;
          }
        ).catch(
          e => this.$notifier.showMessage({ content: e.message, color: 'error' })
        );
      }
    },
    // watch: {
    //   '$route.query.category': () => {
    //     this.category = this.$route.query.category;
    //     console.log(this.$route.query.category);
    //     this.fetchPosts();
    //   },
    //   '$route.query.order': () => {
    //     this.order = this.$route.query.order;
    //     console.log(this.$route.query.order);
    //     this.fetchPosts();
    //   }
    // }
  }
</script>

<style scoped>

</style>
