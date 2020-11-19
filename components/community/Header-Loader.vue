<template>
  <div v-show="true">
    <v-skeleton-loader
      v-show="true"
      type="image"/>
    <v-skeleton-loader
      height="100"
      v-show="true"
      type="image"/>

    <v-card v-show="true" class="pa-2">
      <v-skeleton-loader
        class="mx-auto avatar"
        height="150"
        width="150"
        style="border-radius: 300px !important;"
        type="image"/>
      <v-skeleton-loader
        class="mt-10"
        type="table-thead"
        :types="{ 'table-thead': 'heading@3' }"/>
    </v-card>
  </div>
</template>

<script>
    export default {
        name: "Header-Loader"
    }
</script>

<style lang="scss" scoped>
  .avatar {
    border-radius: 50%;
    position: absolute;
    top: -120px;
    left: calc(50% - 75px);
  }
</style>
