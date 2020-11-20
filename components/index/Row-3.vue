<template>
  <v-container class="row3 pa-0" fluid>
    <v-container class="accent darken-3 pa-10 title text-center" cols="12" fluid>
      <h2>Communities are like a new universe</h2>
    </v-container>
    <v-row class="px-4 pt-4 community" fluid>
      <v-col
        class="img"
        cols="12"
        md="7">
        <v-img
          :src="require('../../static/landing/row-3.png')"
          alt="community"
          class="com-img"
          style="width: 700px"></v-img>
      </v-col>
      <v-col
        class="d-flex justify-center align-center description"
        cols="12"
        md="5">
        <p data-aos="fade-up">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueAos from "vue-aos"

export default {
  name: "Row-3",
  components: {
    VueAos
  }
}
</script>

<style lang="scss" scoped>
.row3 {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  h2 {
    font-weight: 100;
  }

  .community {
    background-color: #23241f;
    padding-bottom: 0;
    margin-bottom: 0;

    .img {
      position: relative;
      .com-img {
        position: absolute;
        padding: 0;
        bottom: 0;
      }
    }

    .description {
      p {
        font-size: x-large;
        width: 70%;
        border-radius: 10px;
        border: 1px solid #444444;
        padding: 20px;
        font-weight: 100;
      }
    }

    @media screen and (max-width: 576px) {
      .description {
        p {
          width: 100%;
        }
      }
    }
  }
}
</style>
