<template>
  <v-card
    v-if="hashtags.length > 0"
    class="mx-auto pt-2"
    max-width="100%"
    tile>
    <span class="ml-2 pt-2 text-caption">Hashtags</span>
    <v-list dense>
      <v-list-item-group
        color="primary">
        <v-list-item
          v-for="(tag, index) in hashtags"
          :key="index">
          <v-icon class="py-2 pr-4" size="35">
            mdi-tag-outline
          </v-icon>
          <v-list-item-content>
            {{`#${tag.text}`}}
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
  <NoResult text="hashtag" v-else/>
</template>

<script>
  import NoResult from "../shared/No-Result";

  export default {
    name: "Explore-Hashtags",
    components: { NoResult },
    props: ['hashtags']
  }
</script>

<style scoped>

</style>