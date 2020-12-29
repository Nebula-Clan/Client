<template>
  <v-row class="px-10 py-5">
    <v-col
      cols="12"
      lg="1"
      md="1"
      sm="2">
      <!--      <Categories/>-->
    </v-col>
    <v-col
      cols="12"
      lg="10"
      md="10"
      sm="8">
      <PostView
        v-show="!isPostContentLoading"
        :post="post"
        :author="author"
        :content="postContent"/>
      <v-card v-show="isPostContentLoading" class="pa-2">
        <div class="mx-2  my-6">
          <v-skeleton-loader
            type="card-heading, image"/>
        </div>
        <div
          class="mx-2  my-4">
          <v-skeleton-loader
            type="paragraph"/>
        </div>
        <div
          class="mx-2  my-4">
          <v-skeleton-loader
            type="paragraph"/>
        </div>
        <div
          class="mx-2  my-4">
          <v-skeleton-loader
            type="paragraph"/>
        </div>
        <div
          class="mx-2  my-4">
          <v-skeleton-loader
            type="paragraph"/>
        </div>
        <div
          class="ma-2">
          <v-skeleton-loader
            type="list-item-avatar"/>
        </div>
      </v-card>
      <div>
        <NestedComments v-show="!isCommentLoading" :postId="$route.params.id" :root="comments"/>
        <v-card v-show="isCommentLoading" class="mt-3">
          <div
            class="ma-2">
            <v-skeleton-loader
              type="list-item-avatar-two-line"/>
          </div>
          <div
            class="ma-2">
            <v-skeleton-loader
              type="list-item-avatar-two-line"/>
          </div>
          <div
            class="ma-2">
            <v-skeleton-loader
              type="list-item-avatar-two-line"/>
          </div>
        </v-card>
      </div>
    </v-col>
    <v-col
      cols="12"
      lg="1"
      md="1"
      sm="2">
      <br>
    </v-col>
  </v-row>
</template>

<script>
  import User from "@/components/homepage/User";
  import Categories from "@/components/homepage/Categories";
  import Communities from "@/components/homepage/Communities";
  import Write from "@/components/shared/Write";
  import PostQuickView from "@/components/shared/Post-quick-view";
  import PostView from "@/components/post/PostView";
  import NestedComments from "@/components/comment/NestedComments";
  import {mapActions} from "vuex";

  export default {
    name: "_id",
    components: {
      NestedComments,
      PostView,
      User,
      Categories,
      Communities,
      Write,
      PostQuickView
    },
    data: () => ({
      post: '',
      author: '',
      postContent: `<style>img{width: 100%;}</style>`,
      comments: [],

      isPostContentLoading: true,
      isCommentLoading: true
    }),
    mounted() {
      this.fetchComments();
      this.fetchPostContent();
    },
    methods: {
      ...mapActions('modules/post', ['getFullPost']),
      ...mapActions('modules/comment/post_comment', ['getComments']),
      fetchComments() {
        this.getComments({ postId: this.$route.params.id })
        .then(({ data }) => {
          this.comments = data.comments;
          this.isCommentLoading = false;
        })
        .catch((err) => {
          return this.$nuxt.error({ statusCode: 404, message: err.message })
        })
      },
      fetchPostContent() {
        this.getFullPost({
          id: this.$route.params.id,
        })
        .then(({ data }) => {
          this.post = data.post;
          this.author = data.post.author;
          this.postContent += data.post.post_content.content_text;
          this.isPostContentLoading = false;
        })
        .catch((err) => {
          return this.$nuxt.error({ statusCode: 404, message: err.message })
        })
      }
    }
  }
</script>

<style scoped>

</style>
