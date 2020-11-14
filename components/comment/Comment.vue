<template>
  <v-card
    class="comment pa-2 mt-1"
    :color="depth % 2 === 1 ? '#2a2a2a' : '#1e1e1e'">
    <a class="avatar">
      <img :src="$axios.defaults.baseURL + comment.author.profile_picture" :alt="comment.author.username">
    </a>
    <div class="content">
      <!-- Content  -->
      <a class="author">{{ comment.author.username }}</a>
      <div class="metadata">
        <span class="date">{{ dateDuration }}</span>
      </div>
      <div class="text">
        {{ comment.content }}
      </div>
      <!-- Actions  -->
      <v-row
        class="actions justify-content"
        no-gutters>
        <v-col class="my-auto" cols="1">
          <a
            v-if="isReplyTextAreaExpanded"
            class="reply"
            @click="isReplyTextAreaExpanded = !isReplyTextAreaExpanded">
            <v-icon class="mr-1" small>mdi-close</v-icon>
            Cancel
          </a>
          <a
            v-else
            class="reply"
            @click="isReplyTextAreaExpanded = !isReplyTextAreaExpanded">
            <v-icon class="mr-1" small>mdi-reply</v-icon>
            Reply
          </a>
        </v-col>
        <v-col class="my-auto" cols="2">
          <a
            v-if="replies.length !== 0 && isRepliesExpanded"
            class="reply"
            @click="isRepliesExpanded = !isRepliesExpanded">
            <v-icon class="mr-1" small>mdi-arrow-up-drop-circle-outline</v-icon>
            Hide Replays
          </a>
          <a
            v-else-if="replies.length !== 0 && !isRepliesExpanded"
            class="reply"
            @click="isRepliesExpanded = !isRepliesExpanded">
            <v-icon class="mr-1" small>mdi-arrow-down-drop-circle-outline</v-icon>
            Show replies ({{ replies.length }})
          </a>
        </v-col>
        <v-col cols="8"></v-col>
        <v-col cols="1">
          <v-btn icon>
            <v-icon small>mdi-heart</v-icon>
          </v-btn>
          <a
            class="reply"
            @click="openLikeDialog">
            ({{ 12 }})
          </a>
        </v-col>
      </v-row>
    </div>
    <!-- Replay  -->
    <v-expand-transition>
      <div v-show="isReplyTextAreaExpanded" class="ml-3 mt-3">
        <v-textarea
          outlined
          auto-grow
          v-model="replayText"
          :label="`Reply ${comment.author.username}`"
        ></v-textarea>
        <div class="pb-2 d-flex flex-row-reverse">
          <v-btn
            @click="replyComment"
            depressed
            outlined
            color="primary"
            :loading="isLoadingToSend"
            elevation="2">
            Send
          </v-btn>
        </div>
      </div>
    </v-expand-transition>
    <v-expand-transition v-if="replies.length !== 0">
      <Comments
        v-show="isRepliesExpanded"
        :depth="depth + 1"
        :root="replies"/>
    </v-expand-transition>
  </v-card>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "Comment",
  components: {Comments: () => import('@/components/comment/Comments')},
  data: () => ({
    author: "",
    avatar: "",
    date: new Date(),
    textComment: "",
    likes: 0,

    isReplyTextAreaExpanded: false,
    isLoadingToSend: false,
    replayText: "",

    isRepliesExpanded: false,
  }),
  props: ['comment', 'replies', 'depth'],
  computed: {
    dateDuration: {
      get: function () {
        const unixTime = new Date(this.comment.create_date).getTime()
        const now = new Date().getTime()
        if (now - unixTime < 180000) {
          return 'Just now'
        } else if (now - unixTime < 36e+5) {
          return Math.floor((now - unixTime) / 60000) + ' m'
        } else if (now - unixTime > 36e+5 && now - unixTime < 36e+5 * 24) {
          return Math.floor((now - unixTime) / 36e+5) + ' h'
        } else {
          return Math.floor((now - unixTime) / (36e+5 * 24)) + ' day(s)'
        }
      }
    }
  },
  methods: {
    ...mapActions('modules/comment/post_comment', ['replyToComment']),
    ...mapActions('modules/comment/post_comment', ['getRepliesComments']),
    openLikeDialog() {

    },
    replyComment() {
      this.isLoadingToSend = true;
      this.replyToComment({
        commentId: this.comment.id,
        content: this.replayText,
      }).then(({data}) => {
        this.fetchRepliesToComment()
      }).catch((error) => {
        console.log(error);
      })
    },
    fetchRepliesToComment() {
      this.getRepliesComments({
        commentId: this.comment.id
      }).then(({data}) => {
        this.replies = data.replies;
        this.isLoadingToSend = false;
        this.isReplyTextAreaExpanded = false;
        this.replayText = "";
      }).catch((error) => {
        console.log(error);
      })
    }
  }
}
</script>

<style scoped lang="scss">

/*--------------
     Comment
---------------*/
.comment {
  position: relative;
  background: none;
  border: none;
  border-top: none;
  line-height: 1.2;
}

.comment:first-child {
  margin-top: 0em;
  padding-top: 0em;
}

/*--------------------
    Nested Comments
---------------------*/
.comment {
  border: none;
  border-top: none;
  background: none;
}

/*--------------
     Avatar
---------------*/
.comment .avatar {
  display: block;
  width: 2.5em;
  height: auto;
  float: left;
  margin: 0.2em 0em 0em;
}

.comment img.avatar,
.comment .avatar img {
  display: block;
  margin: 0em auto;
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
}

/*--------------
     Content
---------------*/
.comment > .content {
  display: block;
}

/* If there is an avatar move content over */
.comment > .avatar ~ .content {
  margin-left: 3.5em;
}

/*--------------
     Author
---------------*/
.comment .author {
  font-size: 1em;
  color: $color-comment-username;
  font-weight: bold;
}

.comment a.author {
  cursor: pointer;
}

.comment a.author:hover {
  color: $color-comment-hover;
}

/*--------------
     Metadata
---------------*/
.comment .metadata {
  display: inline-block;
  margin-left: 0.5em;
  color: $color-comment-metadata;
  font-size: 0.875em;
}

.comment .metadata > * {
  display: inline-block;
  margin: 0em 0.5em 0em 0em;
}

.comment .metadata > :last-child {
  margin-right: 0em;
}

/*--------------------
     Comment Text
---------------------*/
.comment .text {
  margin: 0.25em 0em 0.5em;
  font-size: 1em;
  word-wrap: break-word;
  color: $color-comment-content;
  line-height: 1.3;
}

/*--------------------
     User Actions
---------------------*/
.comment .actions {
  font-size: 0.875em;
}

.comment .actions a {
  cursor: pointer;
  display: inline-block;
  margin: 0em 0.75em 0em 0em;
  color: $color-comment-actions;
}

.comment .actions a:last-child {
  margin-right: 0em;
}

.comment .actions a.active,
.comment .actions a:hover {
  color: $color-comment-actions-hover;
}

.ui.minimal.comments .comment .actions {
  opacity: 0;
  position: absolute;
  top: 0px;
  right: 0px;
  left: auto;
  transition: opacity 0.2s ease;
  transition-delay: 0.1s;
}

.ui.minimal.comments .comment > .content:hover > .actions {
  opacity: 1;
}

</style>
