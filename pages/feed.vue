<template>
  <v-row class="px-10 py-5">
    <v-col
      cols="12"
      lg="2"
      md="3"
      sm="3">
      <Categories/>
    </v-col>
    <v-col
      cols="12"
      lg="8"
      md="6"
      sm="6">
      <Write @posted="getPosts"/>
      <br>
      <PostQuickView
        v-show="!isPostLoading"
        v-for="(post, i) in posts" :key="i" :post="post"/>
      <v-skeleton-loader
        v-show="isPostLoading"
        v-for="i in 5"
        class="mb-2 pa-1"
        elevation="2"
        type="card-heading, card, list-item-three-line, list-item-avatar"/>
    </v-col>
    <v-col
      cols="12"
      lg="2"
      md="3"
      sm="3">
      <User :user="this.$auth.user"/>
      <br>
      <Communities
        v-show="!isCommunitiesLoading"
        :communities="communities"
        @refresh="refresh"/>
      <v-skeleton-loader
        v-show="isCommunitiesLoading"
        elevation="2"
        type="card-heading"/>
      <v-skeleton-loader
        v-show="isCommunitiesLoading"
        v-for="i in 5"
        elevation="2"
        type="list-item-avatar"/>
    </v-col>
  </v-row>
</template>

<script>
import User from '@/components/homepage/User'
import Categories from '@/components/homepage/Categories'
import Communities from '@/components/homepage/Communities'
import Write from '@/components/homepage/Write'
import PostQuickView from '@/components/homepage/Post-quick-view'

export default {
  name: 'feed',
  components: {
    User,
    Categories,
    Communities,
    Write,
    PostQuickView
  },
  data() {
    return {
      posts: null,
      communities: [],

      isPostLoading: true,
      isCommunitiesLoading: true
    }
  },
  methods: {
    getPosts() {
      // Posts
      this.$axios.get('api/posts/home_posts?order_key=new')
        .then((res) => {
          this.posts = res.data.posts;
          this.isPostLoading = false;
        })
        .catch(e => this.$notifier.showMessage({content: e.message, color: 'error'}));
      // Communities
      this.$axios.get('api/community/user_communities').then(
        ({data}) => {
          this.communities = data.communities;
          this.isCommunitiesLoading = false;
        }
      ).catch(e => this.$notifier.showMessage({content: e.message, color: 'error'}));
    },
    refresh() {
      console.log('refresh');
      this.getPosts();
    }
  },
  mounted() {
    this.getPosts();
  }
}
</script>

<style scoped>

</style>
