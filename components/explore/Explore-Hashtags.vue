<template>
  <v-card
    class="mx-auto pt-2"
    max-width="100%"
    tile>
    <span class="ml-2 pt-2 text-caption">Hashtags</span>
    <v-list dense>
      <v-list-item-group
        color="primary">
        <v-list-item
          v-for="n in 25"
          :key="n">
          <v-icon class="py-2 pr-4" size="35">
            mdi-tag-outline
          </v-icon>
          <v-list-item-content>
            {{`Tag number ${n}`}}
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    name: "Explore-Hashtags"
  }
</script>

<style scoped>

</style>