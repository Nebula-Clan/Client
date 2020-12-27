<template>
  <v-card
    class="mx-auto pt-2"
    max-width="100%"
    tile>
    <span class="ml-2 text-caption">Categories</span>
    <CategoriesList :categories="categories" avatarSize="35" avatarPadding="py-2"/>
  </v-card>

</template>

<script>
  import CategoriesList from "../shared/Categories-List";

  export default {
    name: "Explore-Categories",
    components: { CategoriesList },
    props: ['categories'],
  }
</script>

<style scoped>

</style>