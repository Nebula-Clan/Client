<template>
  <v-row class="px-10 py-5">
    <v-col
      cols="12"
      sm="3"
      md="3"
      lg="2">
      <Categories/>
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="6"
      lg="8">
      <CreatePost/>
    </v-col>
    <v-col
      cols="12"
      sm="3"
      md="3"
      lg="2">
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
