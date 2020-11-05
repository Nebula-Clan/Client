<template>
  <v-card elevation="2" class="pa-2">
    <v-card-title>
      Search settings
    </v-card-title>
    <v-card-text>
      <v-col>
        <p>Sort by</p>
        <v-radio-group
          column
          v-model="sort">
          <v-radio label="latest"
                   value="latest">
          </v-radio>
          <v-radio label="popular"
                   value="popular">
          </v-radio>
        </v-radio-group>
      </v-col>
    </v-card-text>
    <v-card-actions>
      <v-btn
        @click="apply"
        color="accent"
        outlined>
        Apply filters
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      sort: 'latest'
    }
  },
  methods: {
    apply() {
      const params = this.$route.query
      this.$router.replace({query:{...params, sort: this.sort}})
    }
  },
  watch: {
    $route (to ,from) {
      this.sort = to.query.sort
    }
  }
}
</script>

<style scoped>

</style>
