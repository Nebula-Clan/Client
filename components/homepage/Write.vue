<template>
  <v-card elevation="2">
    <v-card-title>
      <v-icon class="pr-3">mdi-pencil</v-icon>
      Create a post
    </v-card-title>
    <v-textarea
      v-model="text"
      auto-grow
      class="px-2"
      clearable
      label="Quick post"
      name="input-7-4"
      outlined>
    </v-textarea>
    <v-divider class="primary"></v-divider>
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
              icon
              to="/new-post">
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
              icon
              @click="publish">
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
import {mapActions} from "vuex";

export default {
  name: 'Write',
  props: ['community'],
  data() {
    return {
      text: null,
      post: {
        title: '',
        description: '',
        contentType: 'OT',
        category: 'OTHER',
        content: '',
        headerImage: null,
        hashtags: [],
        communityName: null
      },
    }
  },
  methods: {
    ...mapActions('modules/post', ['createPost']),
    publish() {
      if (this.community) {
        this.post.communityName = this.community;
      }
      this.post.description = this.text;
      this.post.content = this.text;
      this.createPost(this.post).then(
        () => {
          this.$notifier.showMessage({content: 'Posted, hurray!', color: 'success'});
          this.$emit('posted');
        }).catch((e) => {
        this.$notifier.showMessage({content: e.message, color: 'success'});
      });
    },
  }
}
</script>

<style scoped>

</style>
