<template>
  <div>
    <v-skeleton-loader
      height="80"
      v-show="true"
      tile=false
      type="image"/>
    <v-card tile=false>
      <v-skeleton-loader
        class="mx-auto avatar"
        height="80"
        width="80"
        style="border-radius: 300px !important;"
        type="image"/>
      <v-skeleton-loader
        class="pt-10"
        type="list-item-two-line"/>
      <v-divider class="primary"/>
      <v-row class="mx-2">
        <v-col>
          <v-skeleton-loader
            class="mt-2"
            type="text"/>
        </v-col>
        <v-col>
          <v-skeleton-loader
            class="mt-2"
            type="text"/>
        </v-col>
        <v-col>
          <v-skeleton-loader
            class="mt-2"
            type="text"/>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
    export default {
        name: "User-Loader"
    }
</script>

<style lang="scss" scoped>

  .avatar {
    position: absolute;
    border-radius: 50%;
    top: -50px;
    left: calc(50% - 40px);
  }
</style>
