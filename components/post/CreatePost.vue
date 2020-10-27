<template>
  <v-card elevation="8">
    <v-card-title>
      <v-icon class="pr-3">mdi-pencil</v-icon>
      New Post
    </v-card-title>
    <Editor/>
    <v-divider></v-divider>
    <v-row class="px-4">
      <v-col cols="5">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon>
              <v-icon>mdi-image</v-icon>
            </v-btn>
          </template>
          <span>Add image</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon>
              <v-icon>mdi-sticker-emoji</v-icon>
            </v-btn>
          </template>
          <span>Add emoji</span>
        </v-tooltip>
      </v-col>
      <v-col cols="5">
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
      <v-col class="text-right" cols="2">
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
import Editor from '@/components/post/Editor'

export default {
  name: 'CreatePost',
  components: {
    Editor
  },
}
</script>


<style scoped>
</style>
