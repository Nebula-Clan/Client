<template>
  <v-container class="row2" fluid>
    <v-container class="purple darken-2 pa-10 title text-center" cols="12" fluid>
      <h2>Explore what's happening in the world</h2>
    </v-container>
    <v-row class="pa-4 ma-8">
      <v-col cols="4" class="description">
        <p style="font-size: larger">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </v-col>
      <v-col cols="8" class="d-flex justify-center align-center">
        <SamplePost />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SamplePost from "./Sample-Post"
export default {
  name: "Row-2",
  components: {
    SamplePost
  }
}
</script>

<style lang="scss" scoped>
.row2 {
  width: 100%;
  padding-bottom: 0;
  padding-top: 0;
  display: flex;
  flex-direction: column;

  .title {
    h2 {
      font-weight: 100;
    }
  }

  .description {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      width: 70%;
      font-weight: 300;
    }
  }
}
</style>
