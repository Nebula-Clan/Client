<template>
  <v-card>
    <v-card-title>Drafts</v-card-title>
    <v-card-text>
      <div v-if="pageLoaded">
        <Draft v-for="d in drafts"
               @deleted="getDrafts"
               :key="i"
               :draft="d"></Draft>
        <div v-if="drafts.length === 0" class="text-center">
          <img alt="empty"
               height="400px"
               src="../../static/user-settings/empty.svg" />
          <h3>It is so quiet here, Add some drafts.</h3>
        </div>
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
      pageLoaded: true,
      drafts: []
    }
  },
  methods: {
    getDrafts: function() {
      this.$axios.get('api/draft/get_drafts/').then(
        response => this.drafts = response.data['draft_posts']
      ).catch();
    }
  },
  mounted() {
    this.getDrafts();
  }
}
</script>

<style scoped>

</style>
