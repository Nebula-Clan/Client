<template>
  <v-card
    class="mx-auto"
    elevation="2"
    tile>
    <v-list rounded dense>
      <v-subheader>Menu</v-subheader>
      <v-list-item-group
        :v-model="1"
        color="primary">
        <v-list-item
          v-for="(item, i) in pages"
          :to="item.link"
          :key="i">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.label"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "PagesList",
  data() {
    return {
      pages: [
        {icon: 'mdi-account', label: 'Profile', link: '/preferences/profile'},
        {icon: 'mdi-content-save', label: 'Drafts', link: '/preferences/drafts'},
        {icon: 'mdi-account-group', label: 'My Communities', link: '/preferences/communities'},
        {icon: 'mdi-cog', label: 'Personalization', link: '/preferences/personalization'},

      ]
    }
  }
}
</script>

<style scoped>

</style>
