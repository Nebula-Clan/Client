<template>
  <v-card class="pa-2">
    <v-expand-transition>
      <!-- Replay  -->
      <div v-show="isCommentToPostExpanded">
        <NewComment :is-loading-to-send="isLoadingToSend" :submit-comment="replyComment"/>
      </div>
    </v-expand-transition>
    <div class="ui comments mx-2">
      <Comment
        :depth="0"
        :comment="item.comment"
        :replies="item.replies"
        :key="i"
        v-for="(item, i) in root"/>
    </div>
  </v-card>
</template>

<script>
  import Comment from "@/components/comment/Comment";
  import {mapActions, mapGetters} from "vuex";
  import NewComment from "./NewComment";

  export default {
    name: "NestedComments",
    components: { NewComment, Comment },
    data: () => ({
      isLoadingToSend: false,
    }),
    computed: {
      ...mapGetters('modules/post', ['isCommentToPostExpanded'])
    },
    methods: {
      ...mapActions('modules/post', ['setCommentToPost']),
      ...mapActions('modules/comment/post_comment', ['replyToPost']),
      ...mapActions('modules/comment/post_comment', ['getComments']),
      replyComment(newComment) {
        this.isLoadingToSend = true;
        this.replyToPost({
          postId: this.postId,
          content: newComment.replayText
        }).then(({ data }) => {
          this.fetchComments();
        }).catch((error) => {
          console.log(error)
        })
      },
      fetchComments() {
        this.getComments({ postId: this.$route.params.id }).then(({ data }) => {
          this.root = data.comments;
          this.setCommentToPost(this.isCommentToPostExpanded);
          this.isLoadingToSend = false;
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
