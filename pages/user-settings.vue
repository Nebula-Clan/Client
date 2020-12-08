<template>
  <v-container fluid>
    <v-row class="ma-4">
      <v-col md="3">
        <PagesList />
      </v-col>
      <v-col md="9">
        <NuxtChild />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PagesList from "~/components/user-settings/Pages";
export default {
  name: "user-settings",
  components: {PagesList},
}
</script>

<style scoped>

</style>
