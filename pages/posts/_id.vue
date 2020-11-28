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
        :post="post"
        :author="author"
        :content="postContent"/>
      <div>
        <NestedComments :postId="$route.params.id" :root="comments"/>
      </div>
    </v-col>
    <v-col
      cols="12"
      lg="1"
      md="1"
      sm="2">
<!--      <User :user="this.$auth.user"/>-->
      <br>
<!--      <Communities/>-->
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
  }),
  mounted() {
    this.fetchComments();
    this.fetchPostContent();
  },
  methods: {
    ...mapActions('modules/post', ['getFullPost']),
    ...mapActions('modules/comment/post_comment', ['getComments']),
    fetchComments() {
      this.getComments({postId: this.$route.params.id}).then(({data}) => {
        console.log(data)
        this.comments = data.comments
      }).catch((error) => {
        console.log(error)
      })
    },
    fetchPostContent() {
      this.getFullPost({
        id: this.$route.params.id,
      }).then(({data}) => {
        console.log(data)
        this.post = data.post;
        this.author = data.post.author;
        this.postContent += data.post.post_content.content_text;
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>

</style>
