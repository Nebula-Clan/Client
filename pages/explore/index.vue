<template>
  <v-row class="px-10 py-5">
    <v-col
      cols="12"
      xl="1"
      lg="1"
      md="1"
      sm="0"/>

    <v-col
      cols="12"
      xl="10"
      lg="10"
      md="10"
      sm="12">
      <h1>here we go</h1>
    </v-col>

    <v-col
      cols="12"
      xl="1"
      lg="1"
      md="1"
      sm="0"/>

  </v-row>
</template>

<script>
  export default {
    name: "explore",
    data: () => ({
      explorePage: 0
    })
  }
</script>

<style scoped>
  .explore-nav {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
</style>