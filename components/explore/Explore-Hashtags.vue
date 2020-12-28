<template>
  <v-card
    v-if="isLoading"
    class="mx-auto pt-2"
    max-width="100%"
    tile>
    <MenuIconLoader :number-of-items="40"/>
  </v-card>
  <v-card
    v-else-if="hashtags.length > 0"
    class="mx-auto pt-4"
    max-width="100%"
    tile>
    <span class="ml-3 text-h4">Hashtags</span>
    <v-divider class="mt-4"/>
    <v-list dense>
      <nuxt-link
        v-for="(tag, index) in hashtags"
        :key="index"
        class="text-decoration-none"
        :to="`/explore?hashtag=${tag.text}`">
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
      </nuxt-link>
    </v-list>
  </v-card>
  <NoResult text="hashtag" v-else/>
</template>

<script>
  import NoResult from "../shared/No-Result";
  import MenuIconLoader from "../homepage/Menu-Icon-Loader";

  export default {
    name: "Explore-Hashtags",
    components: { MenuIconLoader, NoResult },
    props: ['hashtags', 'isLoading']
  }
</script>

<style scoped>

</style>