<template>
  <div class="comment">
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
        Elliot you are always so right :)
      </div>
      <!-- Actions  -->
      <div class="actions">
        <a
          class="reply"
          @click="isReplyTextAreaExpanded = !isReplyTextAreaExpanded">
          Reply
        </a>
        <a
          class="reply"
          @click="isRepliesExpanded = !isRepliesExpanded">
          {{ replies.length === 0 ? "" : isRepliesExpanded ? "Hide Replays" : "Show replies" }}
        </a>
        <v-btn
          icon>
          <v-icon small>mdi-heart</v-icon>
        </v-btn>
      </div>
    </div>
    <!-- Replay  -->
    <v-expand-transition>
      <div v-show="isReplyTextAreaExpanded" class="ml-3 mt-3">
        <v-textarea
          filled
          :label="`Replay ${comment.author.username}`"
          auto-grow
          :value="replayText"
        ></v-textarea>
        <div class="pb-2 d-flex flex-row-reverse">
          <v-btn
            depressed
            elevation="2">
            Send
          </v-btn>
          <v-btn
            class="mr-4"
            depressed
            elevation="2">
            Cancel
          </v-btn>
        </div>
      </div>
    </v-expand-transition>
    <v-expand-transition v-if="replies.length !== 0">
      <Comments
        v-show="isRepliesExpanded"
        :root="replies"/>
    </v-expand-transition>
  </div>
</template>

<script>

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
    replayText: "",

    isRepliesExpanded: false,
  }),
  props: ['comment', 'replies'],
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
  margin: 0.5em 0em 0em;
  padding: 0.5em 0em 0em;
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
