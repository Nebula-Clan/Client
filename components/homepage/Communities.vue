<template>
  <v-card class="elevation-2">
    <v-card-subtitle>
      Explore Communities
    </v-card-subtitle>
    <v-divider class="primary"></v-divider>
    <v-list dense>
          <v-list-item-group>
          <nuxt-link
            class="text-decoration-none"
            v-for="(item, i) in suggestions"
            :key="i"
            :to="item.link">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  {{item.name}} | {{item.members}} <v-icon size="15">mdi-account</v-icon>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </nuxt-link>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'communities.component',
  data: () => {
    return {
      suggestions: []
    }
  }
}
</script>

<style scoped>

</style>
