<template>
  <v-card elevation="2">
    <v-card-title>
      <v-icon class="pr-3">mdi-pencil</v-icon>
      New Post
    </v-card-title>
    <Editor :draft="post.content" @updateEditorContent="post.content=$event"/>
    <v-divider class="primary"/>
    <v-row class="px-4">
      <v-col class="d-flex justify-end">
        <v-dialog
          v-model="dialog"
          max-width="600px"
          persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="primary"
              outlined>
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
                  <v-form v-model="formValid" class="publish-form" @submit.prevent="publish">
                    <v-col cols="12">
                      <v-text-field
                        v-model="post.title"
                        :rules="titleRules"
                        counter
                        label="Title"
                        outlined>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="post.description"
                        :rules="descRules"
                        auto-grow
                        counter
                        label="Description"
                        outlined/>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        v-model="post.headerImage"
                        accept="image/png, image/jpeg, image/bmp"
                        label="Select post cover"
                        outlined
                        show-size
                        prepend-icon="mdi-camera"
                        truncate-length="30"/>
                      <div
                        v-if="draft"
                        class="d-flex align-center">
                        <span class="mr-4">Current: </span>
                        <img
                          class="rounded"
                          alt="previous"
                          width="100"
                          height="100"
                          :src="`${$axios.defaults.baseURL}/media/${post.headerImage}`" />
                      </div>
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
                      <v-text-field v-model="hashtag"
                                    label="Up to 5 hash tags"
                                    outlined
                                    @change="addHashtags"
                                    @input="recommend">
                      </v-text-field>
                      <div v-if="suggestions.length > 0">
                        <span>Suggestion</span>
                        <v-chip
                          v-for="(item, i) in suggestions"
                          :key="i"
                          class="ma-1"
                          small
                          @click="setHashtag(item.text)">
                          {{ item.text }}
                        </v-chip>
                      </div>

                      <div
                        class="my-2">
                        <v-chip
                          v-for="(tag, i) in this.post.hashtags"
                          :key="i"
                          :color="chipsColors[i]"
                          class="ma-1"
                          close
                          outlined
                          @click:close="deleteHashtag(i)">
                          #{{ tag }}
                        </v-chip>
                      </div>
                    </v-col>
                  </v-form>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="error"
                outlined
                text
                @click="dialog = false">
                Close
              </v-btn>
              <v-btn
                :loading="isSavingDraft"
                color="secondary"
                outlined
                text
                @click="saveAsDraft">
                Save As Draft
              </v-btn>
              <v-btn
                :disabled="!formValid"
                :loading="isPostPublishing"
                color="primary"
                outlined
                text
                @click="publish">
                Create
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
<!--        <v-btn-->
<!--          :loading="isSavingDraft"-->
<!--          class="ml-3"-->
<!--          color="secondary"-->
<!--          outlined-->
<!--          text-->
<!--          @click="saveAsDraft">-->
<!--          Save As Draft-->
<!--        </v-btn>-->
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
    draft: false,
    dialog: false,
    formValid: false,
    hashtag: '',
    suggestions: [],
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
    isPostPublishing: false,
    isSavingDraft: false,
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
    this.getDraft();
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
      this.getAllUserCommunities().then(({data}) => {
        this.communities = data.communities.map((community) => community.name);
      }).catch(
        e => this.$notifier.showMessage({content: e.message, color: 'error'})
      );
    },
    // Categories
    fetchCategories() {
      this.getAllCategories()
        .then(({data}) => {
          this.categories = data.categories.map((categoryObj) => categoryObj.title);
        })
        .catch(error => this.$notifier.showMessage({content: error.message, color: 'error'}))
    },
    getDraft: function () {
      const draft_id = this.$route.query.draft
      if (draft_id) {
        this.$axios.get('api/draft/get_draft', {params: {draft_id}}).then(
          response => {
            const draftItem = response.data['draft_post'];
            this.post = {
              id: draftItem.id,
              title: draftItem.title,
              description: draftItem.description,
              headerImage: draftItem['header_image'],
              content: draftItem['post_content']['content_text'],
              hashtags: draftItem['hashtags'].map(h => h['text']),
              contentType: draftItem['post_content']['content_type'],
              category: draftItem['category']
            };
            this.draft = true;
          }).catch(
          error => this["$notifier"].showMessage({content: error.response.data['error']['message'], color: 'error'})
        );
      }
    },
    saveAsDraft: function () {
      let data = new FormData();
      data.append('title', this.post.title);
      data.append('description', this.post.description);
      data.append('content_type', this.post.contentType);
      data.append('category', this.post.category);
      data.append('content', this.post.content);
      data.append('header_image', this.post.headerImage);
      data.append('community_name', this.post.communityName);
      this.post.hashtags.map(h => data.append('hashtags', h));
      let url;
      let httpReq;
      if (this.draft) {
        url = '/api/draft/update_draft/';
        data.append('id', this.post.id);
        httpReq = this.$axios.put
      } else {
        url = '/api/draft/create/';
        httpReq = this.$axios.post
      }
      httpReq(url, data).then(
        () => this["$notifier"].showMessage({content: 'Saved!', color: 'success'})
      ).catch(
        error => this["$notifier"].showMessage({content: error.response.data['error']['message'], color: 'error'})
      );
    }
  }
}
</script>


<style lang="scss" scoped>
.publish-form {
  width: 100%;
}
</style>
