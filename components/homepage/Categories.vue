<template>
  <v-card class="elevation-2">
    <v-card-subtitle>
      Explore Categories
    </v-card-subtitle>
    <v-divider class="primary"/>
    <v-list dense>
      <v-list-item-group>
        <nuxt-link
          v-for="(item, i) in categories"
          :key="i"
          class="text-decoration-none"
          to="/feed/">
          <v-list-item>
            <v-list-item-icon>
              <v-icon v-text="item.icon"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.label"/>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "categories.component",
  data: ()=> {
    return {
      categories: [
        {label: 'Sport', icon: 'mdi-basketball'},
        {label: 'Politics', icon: 'mdi-flag'},
        {label: 'Tech', icon: 'mdi-wifi'},
        {label: 'Fashion', icon: 'mdi-hanger'},
        {label: 'Food', icon: 'mdi-food'},
        {label: 'Travel', icon: 'mdi-train-car'}
      ],
    }
  }
}
</script>

<style scoped>

</style>
