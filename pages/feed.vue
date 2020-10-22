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
      <p>Main</p>
    </v-col>
    <v-col
      cols="12"
      sm="3"
      md="3"
      lg="2">
      <User />
    </v-col>
  </v-row>
</template>

<script>
import User from '~/components/homepage/user.component'
import Categories from '~/components/homepage/categories.component'
export default {
  name: 'feed',
  components: {
    User,
    Categories
  }
}
</script>

<style scoped>

</style>
