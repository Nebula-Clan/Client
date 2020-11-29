<template>
  <v-card elevation="2">
    <v-card-title>
      <v-icon class="pr-3">mdi-pencil</v-icon>
      New Post
    </v-card-title>
    <Editor @updateEditorContent="post.content=$event"/>
    <v-divider class="primary"/>
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
                        label="Description"/>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        outlined
                        accept="image/png, image/jpeg, image/bmp"
                        v-model="post.headerImage"
                        show-size
                        prepend-icon="mdi-camera"
                        label="Select post cover"
                        truncate-length="30"/>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="post.communityName"
                        :items="communities"
                        label="Community"
                        outlined/>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="post.category"
                        :items="categories"
                        label="Category"
                        outlined/>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field outlined
                                    @input="recommend"
                                    v-model="hashtag"
                                    label="Up to 5 hash tags"
                                    @change="addHashtags">
                      </v-text-field>
                      <div v-if="suggestions.length > 0">
                        <span>Suggestion</span>
                        <v-chip
                          class="ma-1"
                          small
                          @click="setHashtag(item.text)"
                          :key="i"
                          v-for="(item, i) in suggestions">
                          {{ item.text }}
                        </v-chip>
                      </div>

                      <div
                        class="my-2">
                        <v-chip
                          outlined
                          close
                          @click:close="deleteHashtag(i)"
                          class="ma-1"
                          :key="i"
                          :color="chipsColors[i]"
                          v-for="(tag, i) in this.post.hashtags">
                          #{{ tag }}
                        </v-chip>
                      </div>
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
                :loading="isPostPublishing"
                outlined
                :disabled="!formValid"
                color="primary"
                text
                @click="publish">
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
  import community from "@/store/modules/community/community";

  export default {
    name: 'CreatePost',
    data: () => ({
      dialog: false,
      formValid: false,
      hashtag: '',
      suggestions: [],
      post: {
        title: '',
        description: '',
        contentType: 'OT',
        category: '',
        content: '',
        headerImage: null,
        communityName: '',
        hashtags: []
      },
      isPostPublishing: false,
      communities: [],
      categories: [],

      titleRules: [
        t => !!t || 'Title is required',
        t => t.length <= 50 || 'Max length is 50 characters'
      ],
      descRules: [
        t => !!t || 'Description is required',
        t => t.length <= 750 || 'Max length is 750 characters'
      ],
      chipsColors: [
        'blue', 'red', 'green', 'purple', 'orange'
      ]
    }),
    components: {
      Editor
    },
    mounted() {
      this.fetchCommunities();
      this.fetchCategories();
    },
    methods: {
      ...mapActions('modules/post', ['createPost']),
      ...mapActions('modules/community/community', ['getAllUserCommunities']),
      ...mapActions('modules/category/category', ['getAllCategories']),
      publish() {
        if (this.post.headerImage === null || this.post.headerImage === undefined) {
          delete this.post.headerImage;
        }
        console.log(this.post);
        this.isPostPublishing = true;
        this.createPost(this.post).then((response) => {
          console.log(response)
          this.$auth.redirect('home')
        }).catch((e) => {
          console.error(e)
        })
      },
      // Hashtag
      addHashtags() {
        const hashtagStr = this.hashtag.replace(/ /g, '');
        if (this.post.hashtags.length < 5) {
          this.post.hashtags.push(hashtagStr);
        }
        this.hashtag = '';
      },
      recommend() {
        const hashtagStr = this.hashtag.replace(/ /g, '');
        this.$axios.$get(`api/hashtag/similarity?&text=${hashtagStr}`).then(
          response => {
            this.suggestions = response.hashtags
          }
        ).catch();
      },
      setHashtag(item) {
        this.hashtag = '';
        this.post.hashtags.pop();
        this.post.hashtags.push(item);
        this.suggestions = [];
      },
      deleteHashtag(index) {
        this.post.hashtags.splice(index, 1);
      },
      // Communities
      fetchCommunities() {
        this.getAllUserCommunities().then(({ data }) => {
          this.communities = data.communities.map((community) => community.name);
        }).catch(
          e => this.$notifier.showMessage({ content: e.message, color: 'error' })
        );
      },
      // Categories
      fetchCategories() {
        this.getAllCategories()
          .then(({ data }) => {
            this.categories = data.categories.map((categoryObj) => categoryObj.title);
          })
          .catch(error => this.$notifier.showMessage({ content: error.message, color: 'error' }))
      }
    }
  }
</script>


<style lang="scss" scoped>
  .publish-form {
    width: 100%;
  }
</style>
