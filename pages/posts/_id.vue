<template>
  <v-row class="px-10 py-5">
    <v-col
      cols="12"
      lg="2"
      md="3"
      sm="3">
      <Categories/>
    </v-col>
    <v-col
      cols="12"
      lg="8"
      md="6"
      sm="6">
      <PostView :post="post" :author="author" :content="content"/>
      <div>
        <NestedComments :root="comments"/>
      </div>
    </v-col>
    <v-col
      cols="12"
      lg="2"
      md="3"
      sm="3">
      <User/>
      <br>
      <Communities/>
    </v-col>
  </v-row>
</template>

<script>
import User from "@/components/homepage/User";
import Categories from "@/components/homepage/Categories";
import Communities from "@/components/homepage/Communities";
import Write from "@/components/homepage/Write";
import PostQuickView from "@/components/homepage/Post-quick-view";
import PostView from "@/components/post/PostView";
import CommentDemo from "@/components/comment/CommentDemo";
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
    CommentDemo,
    PostQuickView
  },
  data: () => ({
    post: '',
    author: '',
    content: '',
    comments: [],
  }),
  mounted() {
    this.fetchComments();
  },
  methods: {
    ...mapActions('modules/comment/post_comment', ['getComments']),
    fetchComments() {
      this.getComments({postId: this.$route.params.id}).then((res) => {
        this.comments = res.comments
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
