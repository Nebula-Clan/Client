<template>
  <v-row class="px-10 py-5">
    <v-col
      cols="12"
      xl="1"
      lg="1"
      md="1"
      sm="0"/>

    <v-col
      cols="12"
      xl="10"
      lg="10"
      md="10"
      sm="12">
      <h1>here we go</h1>
    </v-col>

    <v-col
      cols="12"
      xl="1"
      lg="1"
      md="1"
      sm="0"/>

    <div>
      <div class="explore-nav">

        <v-bottom-navigation
          v-model="explorePage"
          class="pb-1"
          color="secondary">

          <v-btn>
            <span class="pt-1">All</span>
            <v-icon>mdi-select-all</v-icon>
          </v-btn>

          <v-btn>
            <span class="pt-1">People</span>
            <v-icon>mdi-account-multiple-outline</v-icon>
          </v-btn>

          <v-btn>
            <span class="pt-1">Hashtags</span>
            <v-icon>mdi-tag-multiple</v-icon>
          </v-btn>

          <v-btn>
            <span class="pt-1">Categories</span>
            <v-icon>mdi-tag-faces</v-icon>
          </v-btn>

        </v-bottom-navigation>
      </div>
    </div>

  </v-row>
</template>

<script>
  export default {
    name: "explore",
    data: () => ({
      explorePage: 0
    })
  }
</script>

<style scoped>
  .explore-nav {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
</style>