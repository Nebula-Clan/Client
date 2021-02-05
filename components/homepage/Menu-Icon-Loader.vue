<template>
  <v-card elevation="2">
    <v-skeleton-loader
      elevation="2"
      type="card-heading"/>
    <v-divider class="primary my-2"/>
    <v-skeleton-loader
      v-for="i in numberOfItems"
      :key="i"
      elevation="2"
      type="list-item-avatar"/>
  </v-card>
</template>

<script>
  export default {
    name: "Menu-Icon-Loader",
    props: ['numberOfItems']
  }
</script>

<style scoped>

</style>
