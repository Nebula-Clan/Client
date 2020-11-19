<template>
  <v-container fluid class="index-page ma-0 pa-0">
    <v-container  fluid>
      <IntroBanner />
    </v-container>
    <v-container  fluid>
      <Row2 />
    </v-container>
    <v-container  fluid>
      <Row3 />
    </v-container>
    <v-container  fluid>
      <Row4 />
    </v-container>
    <v-container  fluid>
      <Row5 />
    </v-container>
  </v-container>
</template>

<script>
import IntroBanner from "@/components/index/Intro-banner"
import Row2 from "@/components/index/Row-2"
import Row3 from "@/components/index/Row-3"
import Row4 from "@/components/index/Row-4"
import Row5 from "@/components/index/Row-5"
import Feature from "@/components/index/Feature";
export default {
  name: "index",
  components: {
    IntroBanner,
    Row2,
    Row3,
    Row4,
    Row5,
    Feature
  }
}
</script>

<style lang="scss" scoped>
  .index-page {
    display: flex;
    flex-direction: column;
    height: 100%;
    .container {
      padding: 0;
      margin: 0;
    }
  }
</style>
