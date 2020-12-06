<template>
  <v-container>
    <v-row>
      <v-col md="3">
        <PagesList />
      </v-col>
      <v-col>
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
