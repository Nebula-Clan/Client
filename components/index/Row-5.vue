<template>
  <v-container class="row5 pa-0" fluid>
    <v-container class="pa-10 title text-center" cols="12" fluid>
      <h2>Wanna see more ?!</h2>
    </v-container>
    <v-row class="pa-4 d-flex justify-center">
      <Feature />
    </v-row>
    <v-row class="bottom-row">
      <v-col cols="12">
      <img
        data-aos="fade-up"
        alt="row5"
        src="../../static/landing/readmore.svg">
      </v-col>
    </v-row>
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
      width: 100%;
    }
  }
}
</style>
