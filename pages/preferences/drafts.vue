<template>
  <v-card>
    <v-card-title>Drafts</v-card-title>
    <v-card-text>
      <div v-if="pageLoaded">
        <Draft v-for="d in drafts"
               :key="i"
               :draft="d"
               @deleted="getDrafts"></Draft>
        <div v-if="drafts.length === 0" class="text-center">
          <v-img :src="require('../../static/user-settings/empty.svg')"
                 alt="empty"
                 contain
                 height="400px"></v-img>
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
    getDrafts: function () {
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
