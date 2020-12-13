<template>
  <v-card>
    <v-card-title>Drafts</v-card-title>
    <v-card-text>
      <div v-if="pageLoaded">
        <Draft v-for="i in 5" :key="i" :draft="post"></Draft>
      </div>
      <div v-if="!pageLoaded">
        <DraftLoader></DraftLoader>
        <DraftLoader></DraftLoader>
        <DraftLoader></DraftLoader>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Draft from "~/components/user-settings/Draft";
import DraftLoader from "~/components/user-settings/Draft-Loader";
export default {
  name: "drafts",
  components: {DraftLoader, Draft},
  data() {
    return {
      pageLoaded: false,
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
