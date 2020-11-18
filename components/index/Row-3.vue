<template>
  <v-container class="row3" fluid>
    <v-container class="accent darken-2 pa-10 title text-center" cols="12" fluid>
      <h2>Communities are like a new universe</h2>
    </v-container>
    <v-row class="pt-8 community px-8" fluid>
      <v-col cols="7">
        <img alt="community" src="../../static/landing/row-3.png" style="width: 700px">
      </v-col>
      <v-col cols="5" class="d-flex justify-center align-center">
        <p style="font-size: larger; width: 70%">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Row-3"
}
</script>

<style lang="scss" scoped>
.row3 {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  .community {
    background-color: #444444;
    padding-bottom: 0;
    margin-bottom: 0;
  }
}
</style>
