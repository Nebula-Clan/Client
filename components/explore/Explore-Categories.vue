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
  import {mapActions} from "vuex";
  import CategoriesList from "../shared/Categories-List";

  export default {
    name: "Explore-Categories",
    components: { CategoriesList },
    mounted() {
      this.fetchCategories();
    },
    data: () => ({
      categories: []
    }),
    methods: {
      ...mapActions('modules/category/category', ['getAllCategories']),
      fetchCategories() {
        this.getAllCategories()
        .then(({ data }) => {
          console.log(data.categories);
          this.categories = data.categories;
        })
        .catch(error => this.$notifier.showMessage({ content: error.message, color: 'error' }))
      }
    }
  }
</script>

<style scoped>

</style>