<template>
  <v-row class="px-10 py-5">
    <v-col
      cols="12"
      sm="3"
      md="3"
      lg="2">
      <Categories />
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="6"
      lg="8">
      <Write />
    </v-col>
    <v-col
      cols="12"
      sm="3"
      md="3"
      lg="2">
      <User />
      <br>
      <Communities />
    </v-col>
  </v-row>
</template>

<script>
import User from '~/components/homepage/user.component'
import Categories from '~/components/homepage/categories.component'
import Communities from '~/components/homepage/communities.component'
import Write from '~/components/homepage/write.component'
export default {
  name: 'feed',
  components: {
    User,
    Categories,
    Communities,
    Write
  }
}
</script>

<style scoped>

</style>
