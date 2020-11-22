<template>
  <v-container class="row5 pa-0" fluid>
    <v-container class="pa-10 title text-center" cols="12" fluid>
      <h2>Wanna see more ?!</h2>
    </v-container>
    <v-row class="pa-4 d-flex justify-center">
      <Feature />
    </v-row>
    <v-container class="bottom-row">
      <img
        data-aos="fade-up"
        alt="row5"
        src="../../static/landing/readmore.svg">
    </v-container>
  </v-container>
</template>

<script>
import Feature from "@/components/index/Feature";
export default {
  name: "Row-5",
  components: {Feature},
}
</script>

<style lang="scss" scoped>
.row5 {
  background-color: #4b4b4b;
  .title {
    background-color: #795548;
    h2 {
      font-weight: 100;
    }
  }
  .bottom-row {
    text-align: center;
    img {
      height: 500px;
    }
  }
}
</style>
