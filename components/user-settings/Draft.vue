<template>
  <v-card elevation="0">
    <v-card-title>{{draft.title || 'Undefined'}}</v-card-title>
    <v-card-subtitle class="primary--text">{{draft.date}}</v-card-subtitle>
    <v-card-text>
      <p>
        {{draft.description || 'Undefined'}}
      </p>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn icon
             :to="'/new-post?draft=' + draft.id"
             small>
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn icon
             @click="deleteDraft"
             small>
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-card-actions>
    <v-divider class="ma-2"></v-divider>
  </v-card>
</template>

<script>
export default {
  name: "Draft",
  props: ['draft'],
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
