<template>
  <v-card elevation="8">
    <v-card-title>
      <v-icon class="pr-3">mdi-pencil</v-icon>
      New Post
    </v-card-title>
    <Editor @updateEditorContent="post.content=$event"/>
    <v-divider class="primary"></v-divider>
    <v-row class="px-4">
      <v-col>
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              outlined
              color="primary"
              v-bind="attrs"
              v-on="on">
              publish
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Create a new post</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-form class="publish-form" v-model="formValid" @submit.prevent="publish">
                    <v-col cols="12">
                      <v-text-field
                        outlined
                        v-model="post.title"
                        :rules="titleRules"
                        counter
                        label="Title">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        outlined
                        v-model="post.description"
                        :rules="descRules"
                        counter
                        auto-grow
                        label="Description"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        outlined
                        accept="image/png, image/jpeg, image/bmp"
                        v-model="post.headerImage"
                        show-size
                        prepend-icon="mdi-camera"
                        label="Select post cover"
                        truncate-length="30"
                      ></v-file-input>
                    </v-col>
                  </v-form>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                outlined
                color="error"
                text
                @click="dialog = false">
                Close
              </v-btn>
              <v-btn
                outlined
                color="primary"
                text
                @click="publish()">
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
import {mapActions} from 'vuex'

export default {
  name: 'CreatePost',
  data: () => ({
    dialog: false,
    formValid: false,
    post: {
      title: '',
      description: '',
      contentType: 'OT',
      category: 'OTHER',
      content: '',
      headerImage: undefined,
    },
    titleRules: [
      t => !!t || 'Title is required',
      t => t.length <= 50 || 'Max length is 50 characters'
    ],
    descRules: [
      t => !!t || 'Description is required',
      t => t.length <= 750 || 'Max length is 750 characters'
    ]
  }),
  components: {
    Editor
  },
  methods: {
    ...mapActions('modules/post', ['createPost']),
    publish() {
      this.createPost(this.post).then((response) => {
        console.log(response)
        this.$auth.redirect('home')
      }).catch((e) => {
        console.error(e)
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.publish-form {
  width: 100%;
}
</style>
