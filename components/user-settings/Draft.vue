<template>
  <v-card elevation="0">
    <v-card-title>{{ draft.title || 'Untitled' }}</v-card-title>
    <v-card-subtitle class="primary--text">{{ draftDateCreated(draft['date_created']) }}</v-card-subtitle>
    <v-card-text class="d-flex">
      <v-row>
        <v-col md="4" cols="12" class="d-flex" v-if="draft['header_image']">
          <v-img v-if="draft['header_image']"
                 :src="getImageUrl(draft['header_image'])"
                 alt=""
                 width="200px"
                 class="mx-2 rounded"
                 contain>
          </v-img>
        </v-col>
        <v-col md="8" cols="12">
          <p>
            {{ draft.description || 'No Description' }}
          </p>
        </v-col>
      </v-row>


    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn :to="'/new-post?draft=' + draft.id"
             class="mx-2"
             icon>
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-dialog v-model="dialog" max-width="290" persistent>
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
import {draftDateCreated, getImageUrl} from "~/shared-functions/Posts";

export default {
  name: "Draft",
  props: ['draft'],
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    getImageUrl,
    draftDateCreated,
    deleteDraft: function () {
      this.$axios.delete('api/draft/delete_draft', {
        params: {
          id: this.draft.id
        }
      }).then(
        () => {
          this.$emit('deleted');
          this["$notifier"].showMessage({content: 'Removed!', color: 'success'});
          this.dialog = false;
        }
      ).catch(
        error => this["$notifier"].showMessage({content: error.response.data['error']['message'], color: 'error'})
      );
    }
  },
  computed: {}
}
</script>

<style scoped>

</style>
