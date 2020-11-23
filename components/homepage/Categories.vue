<template>
  <v-card class="elevation-2">
    <v-card-subtitle>
      Explore Categories
    </v-card-subtitle>
    <v-divider class="primary"/>
    <v-list dense>
      <v-list-item-group>
        <nuxt-link
          v-for="(category, i) in categories"
          :key="i"
          class="text-decoration-none"
          :to="`/explore/category?category=${category.title}&sort=new`">
          <v-list-item>
            <v-list-item-icon>
              <v-icon v-text="category.icon"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="category.title"/>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  import {mapActions} from "vuex";

  export default {
    name: "categories.component",
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
