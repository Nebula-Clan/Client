<template>
  <v-card elevation="0">
    <v-card-title>{{draft.title}}</v-card-title>
    <v-card-subtitle class="primary--text">{{draft.date}}</v-card-subtitle>
    <v-card-text>
      <p>
        {{draft.description}}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn icon
             small>
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn icon
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
}
</script>

<style scoped>

</style>
