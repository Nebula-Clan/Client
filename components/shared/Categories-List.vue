<template>
  <v-list dense>
    <v-list-item-group>
      <nuxt-link
        v-for="(category, i) in categories"
        :key="i"
        class="text-decoration-none"
        :to="`/explore/category?category=${category.title}&sort=new`">
        <v-list-item :class="avatarPadding === undefined ? '' :  avatarPadding">
          <v-list-item-icon>
            <v-icon v-if="avatarSize===undefined" v-text="category.icon"/>
            <v-icon v-else :size="avatarSize" v-text="category.icon"/>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="category.title"/>
          </v-list-item-content>
        </v-list-item>
      </nuxt-link>
    </v-list-item-group>
  </v-list>
</template>

<script>
  export default {
    name: "Categories-List",
    props: ['categories', 'avatarSize', 'avatarPadding']
  }
</script>

<style scoped>

</style>