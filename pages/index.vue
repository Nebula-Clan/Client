<template>
  <v-row class="index-page">
    <v-row>
      <IntroBanner />
    </v-row>
    <v-row>
      <Row2 />
    </v-row>
    <v-row>
      <Row3 />
    </v-row>
  </v-row>
</template>

<script>
import IntroBanner from "@/components/index/Intro-banner"
import Row2 from "@/components/index/Row-2"
import Row3 from "@/components/index/Row-3"
export default {
  name: "index",
  components: {
    IntroBanner,
    Row2,
    Row3
  }
}
</script>

<style lang="scss" scoped>
  .index-page {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
