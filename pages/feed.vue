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
      <Write/>
      <br>
      <PostQuickView
        v-for="(post, i) in posts" :key="i" :post="post" :author="author"/>
    </v-col>
    <v-col
      cols="12"
      lg="2"
      md="3"
      sm="3">
      <User/>
      <br>
      <Communities/>
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
      author: null
    }
  },
  mounted() {
    const data = new FormData()
    data.append('user_id', '9')
    this.$axios.post('/api/posts/get_user_posts', data)
      .then((res) => {
          this.posts = res.data.all_user_posts,
          this.author = res.data.author
        }).catch()
  }
}
</script>

<style scoped>

</style>
