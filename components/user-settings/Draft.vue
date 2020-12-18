<template>
  <v-card elevation="0">
    <v-card-title>{{draft.title || 'Untitled'}}</v-card-title>
    <v-card-subtitle class="primary--text">{{draft.date}}</v-card-subtitle>
    <v-card-text class="d-flex">
      <img width="150px"
           v-if="draft['header_image']"
           class="mx-2 rounded"
           height="150px"
           :src="$axios.defaults.baseURL + '/media/' + draft['header_image']"
           alt="">
      <p>
        {{draft.description || 'No Description'}}
      </p>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn icon
             class="mx-2"
             :to="'/new-post?draft=' + draft.id">
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            class="mx-2"
            icon>
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Delete ?</v-card-title>
          <v-card-text>Are you sure you want to delete ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" outlined text @click="dialog = false">Cancel</v-btn>
            <v-btn color="accent darken-1" outlined text @click="deleteDraft">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
    <v-divider class="ma-2"></v-divider>
  </v-card>
</template>

<script>
export default {
  name: "Draft",
  props: ['draft'],
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    deleteDraft: function () {
      this.$axios.delete('api/draft/delete_draft', {
        params: {
          id: this.draft.id
        }
      }).then(
        () => {
          this.$emit('deleted');
          this["$notifier"].showMessage({ content: 'Removed!', color: 'success' })
        }
      ).catch(
        error => this["$notifier"].showMessage({content: error.response.data['error']['message'], color: 'error'})
      );
    }
  }
}
</script>

<style scoped>

</style>
