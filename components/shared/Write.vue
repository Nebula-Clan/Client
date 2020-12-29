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
    <v-divider class="primary"/>
    <v-row class="px-4">
      <v-col cols="6">
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
      </v-col>
      <v-col class="text-right" cols="6">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :disabled="text.length === 0"
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
      text: '',
      post: {
        id: '',
        title: '',
        description: '',
        contentType: 'OT',
        category: '',
        content: '',
        headerImage: null,
        communityName: '',
        hashtags: []
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
        this.$notifier.showMessage({content: e.message, color: 'error'});
      });
    },
  }
}
</script>

<style scoped>

</style>
