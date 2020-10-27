<template>
  <v-container class="px-5 py-8">
      <CreatePost/>
  </v-container>
</template>

<script>
import User from '@/components/homepage/User'
import Categories from '@/components/homepage/Categories'
import Communities from '@/components/homepage/Communities'
import CreatePost from '@/components/post/CreatePost'

export default {
  name: 'new-post',
  components: {
    User,
    Categories,
    Communities,
    CreatePost
  }
}
</script>

<style scoped>
</style>
