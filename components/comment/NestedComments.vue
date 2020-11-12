<template>
  <v-card class="pa-2">
    <div class="ui comments mx-2">
      <Comment :depth="0" :comment="item.comment" :replies="item.replies" v-for="item in root"/>
    </div>
    <v-divider class="my-2"></v-divider>
    <!-- Replay  -->
    <v-card class="pa-2" color="#2a2a2a">
      <v-textarea
        filled
        auto-grow
        v-model="replayText"
        :label="`Reply the post`"
      ></v-textarea>
      <div class="pb-2 d-flex flex-row-reverse">
        <v-btn
          @click="replyComment"
          depressed
          color="primary"
          :loading="isLoadingToSend"
          elevation="2">
          Send
        </v-btn>
      </div>
    </v-card>
  </v-card>
</template>

<script>
import Comment from "@/components/comment/Comment";
import {mapActions} from "vuex";

export default {
  name: "NestedComments",
  components: {Comment},
  data: () => ({
    isLoadingToSend: false,
    replayText: "",
  }),
  methods: {
    ...mapActions('modules/comment/post_comment', ['replyToPost']),
    ...mapActions('modules/comment/post_comment', ['getComments']),
    replyComment() {
      this.isLoadingToSend = true;
      this.replyToPost({
        postId: this.postId,
        content: this.replayText
      }).then(({data}) => {
        this.fetchComments();
      }).catch((error) => {
        console.log(error)
      })
    },
    fetchComments() {
      this.getComments({postId: this.$route.params.id}).then(({data}) => {
        this.root = data.comments
        this.isLoadingToSend = false;
        this.replayText = "";
      }).catch((error) => {
        console.log(error)
      })
    },
  },
  props: ['root', 'postId']
}
</script>

<style scoped>

.ui.comments {
  margin: 1.5em 0em;
}

.ui.comments:first-child {
  margin-top: 0em;
}

.ui.comments:last-child {
  margin-bottom: 0em;
}

/*--------------------
    Nested Comments
---------------------*/
.comment .comments {
  margin: 0em 0em 0.5em 1em;
  border-left: white solid 1px;
  padding: 1em 0em 1em 1em;
}

.comment .comments:before {
  position: absolute;
  top: 0px;
  left: 0px;
}


/*******************************
           Variations
*******************************/
/*--------------------
        Threaded
---------------------*/
.ui.threaded.comments .comment .comments {
  margin: -1.5em 0 -1em 1.25em;
  padding: 3em 0em 2em 2.25em;
  box-shadow: -1px 0px 0px rgba(34, 36, 38, 0.15);
}


</style>
