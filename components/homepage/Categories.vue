<template>
  <v-card class="elevation-2">
    <v-card-subtitle>
      Explore Categories
    </v-card-subtitle>
    <v-divider class="primary"/>
    <CategoriesList :categories="categories"/>
  </v-card>
</template>

<script>
  import {mapActions} from "vuex";
  import CategoriesList from "../shared/Categories-List";

  export default {
    name: "categories.component",
    components: { CategoriesList },
    data: () => {
      return {
        categories: [],
      }
    },
    mounted() {
      this.fetchCategories();
    },
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
