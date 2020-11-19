<template>
  <v-card  elevation="2" class="mb-2 pa-1">
    <v-card-title>
      <v-icon class="pr-3">mdi-pencil</v-icon>
      Create a post
    </v-card-title>
    <v-skeleton-loader
      v-show="true"
      class="mb-2 pa-1"
      elevation="2"
      type="image"/>
    <br>
    <v-divider class="primary"/>
    <v-row class="px-4">
      <v-col cols="1">
        <v-skeleton-loader
          height="40"
          width="40"
          style="border-radius: 300px !important;"
          v-show="true"
          elevation="2"
          type="image"/>
      </v-col>
      <v-col cols="1">
        <v-skeleton-loader
          height="40"
          width="40"
          style="border-radius: 300px !important;"
          v-show="true"
          elevation="2"
          type="image"/>
      </v-col>
      <v-col cols="1">
        <v-skeleton-loader
          height="40"
          width="40"
          style="border-radius: 300px !important;"
          v-show="true"
          elevation="2"
          type="image"/>
      </v-col>
      <v-col></v-col>
      <v-col cols="1">
        <v-skeleton-loader
          height="40"
          style="border-radius: 800px !important;"
          width="40"
          v-show="true"
          elevation="2"
          type="image"/>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
    export default {
        name: "Write-Loader"
    }
</script>

<style scoped>

</style>
