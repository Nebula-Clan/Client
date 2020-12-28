<template>
  <v-card
    v-if="categories.length > 0"
    class="mx-auto pt-2"
    max-width="100%"
    tile>
    <span class="ml-2 text-caption">Categories</span>
    <CategoriesList :categories="categories" avatarSize="35" avatarPadding="py-2"/>
  </v-card>
  <NoResult text="category" v-else/>
</template>

<script>
  import CategoriesList from "../shared/Categories-List";
  import NoResult from "../shared/No-Result";

  export default {
    name: "Explore-Categories",
    components: { NoResult, CategoriesList },
    props: ['categories'],
  }
</script>

<style scoped>

</style>