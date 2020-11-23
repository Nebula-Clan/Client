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
        v-for="(post, i) in posts" :key="i" :post="post"/>
    </v-col>
    <v-col
      cols="12"
      lg="2"
      md="3"
      sm="3">
      <User :user="this.$auth.user"/>
      <br>
      <Communities v-if="communities" :communities="communities" @refresh="refresh"/>
    </v-col>
  </v-row>
</template>

<script>
import User from '@/components/homepage/User'
import Categories from '@/components/homepage/Categories'
import Communities from '@/components/homepage/Communities'
import Write from '@/components/shared/Write'
import PostQuickView from '@/components/shared/Post-quick-view'
import {mapGetters} from "vuex";

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
      communities: []
    }
  },
  methods: {
    getPosts() {
      this.$axios.get('api/posts/home_posts?order_key=new')
        .then((res) => {
          this.posts = res.data.posts
        }).catch(
          e => this.$notifier.showMessage({content: e.message, color: 'error'})
      );
      this.$axios.get('api/community/user_communities').then(
        response => this.communities = response.data.communities
      ).catch(
        e => this.$notifier.showMessage({content: e.message, color: 'error'})
      );
    },
    refresh() {
      console.log('refresh');
      this.getPosts();
    }
  },
  mounted() {
    this.getPosts();
  },
}
</script>

<style scoped>

</style>
