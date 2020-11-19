<template>
  <v-card class="card" elevation="4">
    <v-card-title>
      My story of living here, for a week!
    </v-card-title>
    <v-card-subtitle class="d-flex align-center">
      <v-icon small>
        mdi-clock
      </v-icon>
      <span class="mx-2">3h</span>
    </v-card-subtitle>
    <v-img alt="port"
         class="post-image"
         height="350"
         :src="require('../../static/images/Back2.jpg')"/>
    <v-img/>
    <v-card-text>
      <p>
        A lake is an area filled with water, localized in a basin, surrounded by land, apart from any river or other
        outlet that serves to feed or drain the lake. Lakes lie on land and are not part of the ocean, although like the
        much larger oceans, they form part of earth's water cycle.
      </p>
    </v-card-text>
    <v-card-text class="d-flex">
      <v-avatar>
        <img src="../../static/images/LL1.jpg" alt="jack">
      </v-avatar>
      <div class="mx-3 d-flex flex-column">
        <span><b>amir_was_here</b></span>
        <span>Amir Esmaeili</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Sample-Post"
}
</script>

<style lang="scss" scoped>
  .card {
    width: 500px;
    margin: 2rem 0;
  }
</style>
