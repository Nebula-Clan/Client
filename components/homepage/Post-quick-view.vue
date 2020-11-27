<template>
  <v-card class="mb-2 pa-1" elevation="2">
    <v-row>
      <v-col class="ml-5">
        <nuxt-link class="text-decoration-none white--text" :to="'/posts/' + post.id">
          <h2>{{ post.title }}</h2>
        </nuxt-link>
        <div class="mr-2">
          <v-icon size="15">
            mdi-clock
          </v-icon>
          <span style="font-size: smaller">{{ dateDuration }}</span>
        </div>
      </v-col>

      <v-col
        class="text-right"
        cols="2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <span>More</span>
        </v-tooltip>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-if="post.header_image && post.header_image !== '/media/undefined'" class="mx-5 header-image">
        <img alt="image"
             :src="$axios.defaults.baseURL + post.header_image">
      </v-col>
    </v-row>

    <v-row>
      <v-col class="mx-5">
        <p>{{ post.description }}</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-right ml-2">
        <v-chip
          nuxt
          :key="i"
          v-for="(tag, i) in post.hashtags"
          :to="'/search/hashtag?keyword=' + tag.text + '&sort=latest'"
          outlined
          small
          class="mx-1"
          :color="chipsColors[i]">
          #{{tag.text}}
        </v-chip>
      </v-col>
    </v-row>

    <v-row class="mx-2">
      <v-col>
        <nuxt-link class="text-decoration-none white--text d-flex"
                   :to="'/profile/'+post.author.username">
          <div>
            <UserAvatar
              color="primary"
              :avatar-string="post.author.username"
              :avatar-src="post.author.profile_picture"/>
          </div>
          <div class="d-flex flex-column ml-3">
            <span><b>{{ post.author.username }}</b></span>
            <span style="font-size: smaller">{{ post.author.first_name }} {{ post.author.last_name }}</span>
          </div>
        </nuxt-link>
      </v-col>
      <v-col
        class="text-right d-flex justify-end align-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              :color="likedPost"
              @click="likePost"
              icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </template>
          <span>Like</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="isCommentToPostExpanded = !isCommentToPostExpanded"
              v-bind="attrs"
              v-on="on"
              icon>
              <v-icon>mdi-comment</v-icon>
            </v-btn>
          </template>
          <span>Comment</span>
        </v-tooltip>
      </v-col>
    </v-row>

    <!-- Replay  -->
    <v-expand-transition>
      <div class="ml-3 mt-3" v-show="isCommentToPostExpanded">
        <NewComment :is-loading-to-send="isLoadingToSendComment" :submit-comment="replyComment"/>
      </div>
    </v-expand-transition>

  </v-card>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import UserAvatar from "../shared/UserAvatar";
  import NewComment from "../comment/NewComment";

  export default {
    name: 'Post-quick-view',
    components: { NewComment, UserAvatar },
    props: ['post'],
    data: () => {
      return {
        isCommentToPostExpanded: false,
        isLoadingToSendComment: false,

        chipsColors: [
          'blue', 'red', 'green', 'purple', 'orange'
        ],
        like: false,
        dislike: false
      }
    },
    computed: {
      likedPost() {
        if (!this.dislike && (this.post.is_liked || this.like)) {
          return 'pink'
        } else {
          return ''
        }
      },
      dateDuration: {
        get: function () {
          const unixTime = new Date(this.post.date_created).getTime()
          const now = new Date().getTime()
          if (now - unixTime < 36e+5) {
            return Math.floor((now - unixTime) / 60000) + ' m'
          } else if (now - unixTime > 36e+5 && now - unixTime < 36e+5 * 24) {
            return Math.floor((now - unixTime) / 36e+5) + ' h'
          } else {
            return Math.floor((now - unixTime) / (36e+5 * 24)) + ' day(s)'
          }
        }
      },
    },
    methods: {
      ...mapActions('modules/profile/profileLikes', ['submitLikeAtPostWithID', 'deleteLikeAtPostWithID']),
      ...mapActions('modules/comment/post_comment', ['replyToPost']),

      likePost() {
        if (!this.like) {
          this.submitLikeAtPostWithID(this.post.id)
            .then(({ data }) => {
              this.like = true
              this.dislike = false
            })
            .catch((error) => {
              if (error.response.status == 403) {
                this.showErrorWithMessage('Please Login in or Sign Up')
              }
            })
        } else {
          this.deleteLikeAtPostWithID(this.post.id)
            .then(({ data }) => {
              this.like = false
              this.dislike = true
            })
            .catch((error) => {
              if (error.response.status == 403) {
                this.showErrorWithMessage('Please Login in or Sign Up')
              }
            })
        }
      },
      showErrorWithMessage(message) {
        this.$notifier.showMessage({ content: message, color: 'error' });
      },
      replyComment(newComment) {
        this.isLoadingToSendComment = true;
        this.replyToPost({
          postId: this.post.id,
          content: newComment.replayText
        }).then(({ data }) => {
          this.isLoadingToSendComment = false;
          this.isCommentToPostExpanded = !this.isCommentToPostExpanded;
          this.$notifier.showMessage({ content: "Sent", color: 'success' });
        }).catch((error) => {
          this.showErrorWithMessage(error);
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .header-image {
    text-align: center;

    img {
      width: 90%;
      height: 250px;
      border-radius: 5px;
    }
  }
</style>
