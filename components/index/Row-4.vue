<template>
  <v-container class="row4 pa-0" fluid>
    <v-container class="secondary darken-2 pa-10 title text-center" cols="12" fluid>
      <h2>Connect with your friends</h2>
    </v-container>
    <v-row class="pa-4">
      <v-col class="description"
             md="5"
             cols="12">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </v-col>
      <v-col
        class="img"
        md="7"
        cols="12">
        <img alt="chat"
               height="400px"
               class="friends-img"
               :src="require('../../static/landing/row-4.svg')"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
name: "Row-4"
}
</script>

<style lang="scss" scoped>
.row4 {
  background-color: #343434;
  h2 {
    font-weight: 100;
  }
  .img {
    .friends-img {
      height: 500px;
    }
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .description {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      font-size: x-large;
      font-weight: 100;
      border: 1px solid #444444;
      padding: 20px;
      border-radius: 5px;
      width: 70%;
    }
    @media screen and (max-width: 576px) {
      p {
        width: 100%;
      }
    }
  }
}
</style>
