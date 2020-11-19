<template>
  <v-card class="elevation-2">
    <v-card-subtitle>
      Explore Categories
    </v-card-subtitle>
    <v-divider class="primary"></v-divider>
    <v-list dense>
      <v-list-item-group>
        <nuxt-link
          v-for="(item, i) in categories"
          :key="i"
          class="text-decoration-none"
          to="/feed/">
          <v-list-item>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.label"></v-list-item-title>
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
        {label: 'Art', icon: 'mdi-camera'},
        {label: 'Books', icon: 'mdi-book'},
        {label: 'Computers', icon: 'mdi-memory'},
        {label: 'Fashion', icon: 'mdi-hanger'},
        {label: 'Films', icon: 'mdi-video-vintage'},
        {label: 'Food', icon: 'mdi-silverware-variant'},
        {label: 'Fun', icon: 'mdi-emoticon'},
        {label: 'Games', icon: 'mdi-gamepad-variant'},
        {label: 'TV Series', icon: 'mdi-filmstrip'},
        {label: 'Health', icon: 'mdi-hospital'},
        {label: 'Music', icon: 'mdi-headphones'},
        {label: 'News', icon: 'mdi-newspaper'},
        {label: 'Nature', icon: 'mdi-pine-tree'},
        {label: 'Politics', icon: 'mdi-bank'},
        {label: 'Psychology', icon: 'mdi-brain'},
        {label: 'Science', icon: 'mdi-sigma'},
        {label: 'Technology', icon: 'mdi-laptop'},
        {label: 'Travel', icon: 'mdi-train-car'}
      ],
    }
  }
}
</script>

<style scoped>

</style>
