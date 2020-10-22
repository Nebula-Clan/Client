<template>
  <v-row class="pa-5">
    <v-col cols="3">
    </v-col>
    <v-col cols="6">
      <p>Main</p>
    </v-col>
    <v-col cols="3">
      <User />
    </v-col>
  </v-row>
</template>

<script>
import User from '~/components/homepage/user.component'

export default {
  name: 'feed',
  components: {
    User
  }
}
</script>

<style scoped>

</style>
