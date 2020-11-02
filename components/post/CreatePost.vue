<template>
  <v-card elevation="8">
    <v-card-title>
      <v-icon class="pr-3">mdi-pencil</v-icon>
      New Post
    </v-card-title>
    <Editor @updateEditorContent="post.content=$event"/>
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
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon>
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Create a new post</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      filled
                      v-model="post.title"
                      label="Title*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      filled
                      v-model="post.description"
                      name="input-7-4"
                      label="Description*"
                      value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                      filled
                      accept="image/png, image/jpeg, image/bmp"
                      v-model="post.headerImage"
                      show-size
                      prepend-icon="mdi-camera"
                      label="Select post cover"
                      truncate-length="30"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog = false">
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="createPost(post)">
                Create
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Editor from '@/components/post/Editor'
import { mapActions } from 'vuex'

export default {
  name: 'CreatePost',
  data: () => ({
    dialog: false,
    post: {
      title: '',
      description: '',
      contentType: 'OT',
      category: 'OTHER',
      content: '',
      headerImage: undefined,
    }
  }),
  components: {
    Editor
  },
  methods: {
    ...mapActions('modules/post', ['createPost']),
  }
}
</script>


<style scoped>
</style>
