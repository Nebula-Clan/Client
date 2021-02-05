<template>
  <div v-show="true">
    <v-skeleton-loader
      v-show="true"
      type="image"/>
    <v-skeleton-loader
      height="200"
      v-show="true"
      type="image"/>
    <v-card v-show="true" class="pa-2">
      <v-skeleton-loader
        class="avatar"
        height="150"
        width="150"
        style="border-radius: 300px !important;"
        type="image"/>
      <v-row align="center">
        <v-col cols="3"/>
        <v-col
          v-for="index in 6"
          :key="index"
          class="d-flex child-flex"
          :cols="1">
          <v-skeleton-loader
            elevation="2"
            height="30"
            type="image"/>
          <v-col cols="3"/>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "Profile-Header-Loader"
  }
</script>

<style lang="scss" scoped>
  .avatar {
    border-radius: 50%;
    position: absolute;
    top: -80px;
    left: 5%;
  }
</style>
