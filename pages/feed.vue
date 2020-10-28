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
      <PostQuickView/>
      <PostQuickView/>
      <PostQuickView/>

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
  }
}
</script>

<style scoped>

</style>
