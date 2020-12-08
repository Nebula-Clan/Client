<template>
  <v-card>
    <v-card-title>Drafts</v-card-title>
    <v-card-text>
      <Draft v-for="i in 5" :key="i" :draft="post"></Draft>
    </v-card-text>
  </v-card>
</template>

<script>
import Draft from "~/components/user-settings/Draft";
export default {
  name: "drafts",
  components: {Draft},
  data() {
    return {
      post: {
        title: 'Hello',
        date: '2020-12-04',
        description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content'
      }
    }
  }
}
</script>

<style scoped>

</style>
