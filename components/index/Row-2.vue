<template>
  <v-container class="row2 pa-0" fluid>
    <v-container class="purple darken-2 pa-10 title text-center"
                 fluid>
      <h2>Explore what's happening in the world</h2>
    </v-container>
    <v-row class="pa-4">
      <v-col
        cols="12"
        md="5"
        class="description">
        <p
          class="elevation-2"
          data-aos="fade-up">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </v-col>
      <v-col
        cols="12"
        md="7"
        class="d-flex justify-center align-center">
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
      border: 1px solid #444444;
      border-radius: 5px;
      width: 70%;
      font-weight: 100;
      padding: 20px;
      font-size: x-large;
    }
    @media screen and (max-width: 576px) {
      p {
        width: 100%;
      }
    }
  }
}
</style>
