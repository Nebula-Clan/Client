<template>
  <v-card elevation="2">
    <v-card-title>
      <v-icon class="pr-3">mdi-pencil</v-icon>
      Create a post
    </v-card-title>
    <v-textarea
      auto-grow
      class="pa-2"
      clearable
      label="Quick post"
      name="input-7-4"
      outlined>
    </v-textarea>
    <v-divider></v-divider>
    <v-row class="px-4">
      <v-col cols="6">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon>
              <v-icon>mdi-help-circle</v-icon>
            </v-btn>
          </template>
          <span>Create a question</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon>
              <v-icon>mdi-newspaper</v-icon>
            </v-btn>
          </template>
          <span>Create an article</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon>
              <v-icon>mdi-poll</v-icon>
            </v-btn>
          </template>
          <span>Create a poll</span>
        </v-tooltip>
      </v-col>
      <v-col class="text-right" cols="6">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon>
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </template>
          <span>Send post</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'write.component'
}
</script>

<style scoped>

</style>
