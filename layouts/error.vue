<template>
  <v-container class="text-center not-found my-4">
    <div v-if="error.statusCode === 404">
      <img
        alt="404"
        height="400px"
        :src="require('../static/graphics/404.svg')"/>
      <p style="font-size: large; font-weight: 200">Unfortunately we couldn't find the page you requested!</p>
      <p style="font-weight: 200">Please check the spelling or the page is removed by its owner</p>
      <v-btn
        color="primary"
        outlined
        to="/">
        Return Home
      </v-btn>
    </div>
  </v-container>
</template>

<script>
  export default {
    layout: 'error',
    props: {
      error: {
        type: Object,
        default: null
      }
    },
  }
</script>

<style lang="scss" scoped>
  .not-found {
  }
</style>
