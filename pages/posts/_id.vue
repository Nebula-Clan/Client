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
      <PostView :post="post" :author="author" :content="postContent"/>
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
import {mapActions} from "vuex";

export default {
  name: "_post_id",
  components: {
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
    postContent: ''
  }),
  mounted() {
    this.getFullPost({
      id: this.$route.params.id,
    }).then((res) => {
      console.log(res)
      this.post = res.data.post;
      this.author = res.data.post.author;
      this.postContent = res.data.post.post_content.content_text;
    }).catch((error) => {
      console.log(error);
    });
  },
  methods: {
    ...mapActions('modules/post', ['getFullPost']),
  }
}
</script>

<style scoped>

</style>
