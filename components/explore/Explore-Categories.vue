<template>
  <v-card
    v-if="isLoading"
    class="mx-auto pt-2"
    max-width="100%"
    tile>
    <MenuIconLoader :number-of-items="40"/>
  </v-card>
  <v-card
    v-else-if="categories.length > 0"
    class="mx-auto pt-4"
    max-width="100%"
    tile>
    <span class="ml-3 text-h4">Categories</span>
    <v-divider class="mt-4"/>
    <CategoriesList :categories="categories" avatarSize="35" avatarPadding="py-2"/>
  </v-card>
  <NoResult text="category" v-else/>
</template>

<script>
  import CategoriesList from "../shared/Categories-List";
  import NoResult from "../shared/No-Result";
  import MenuIconLoader from "../homepage/Menu-Icon-Loader";

  export default {
    name: "Explore-Categories",
    components: { MenuIconLoader, NoResult, CategoriesList },
    props: ['categories', 'isLoading'],
  }
</script>

<style scoped>

</style>