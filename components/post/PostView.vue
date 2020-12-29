<template>
  <v-card class="mb-2 pa-1" elevation="2">

    <v-row>
      <v-col class="ml-5">
        <v-row class="pb-1">
          <nuxt-link class="text-decoration-none white--text" :to="'/posts/' + post.id">
            <h2>{{ post.title }}</h2>
          </nuxt-link>
          <nuxt-link
            style="text-decoration: none"
            v-if="post.category !== null"
            :to="`/explore?category=${post.category}`">
            <v-sheet
              outlined
              elevation="1"
              color="blue px-3 mt-1 ml-4 rounded-pill">
                <span>
                  {{ post.category === undefined ? "" : post.category.title }}
                </span>
            </v-sheet>
          </nuxt-link>
        </v-row>
        <v-row class="pb-1">
          <div class="mr-2">
            <v-icon size="15">
              mdi-clock
            </v-icon>
            <span style="font-size: smaller">{{ dateDuration }}</span>
          </div>
        </v-row>
      </v-col>

      <v-col
        class="text-right"
        cols="2">
        <v-menu>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" class="ml-auto">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
            <v-list elevation="24">
                <v-list-item>
                    <v-icon>mdi-flag</v-icon>
                    <v-list-item-title class="ml-1" style="cursor: pointer" @click="reportOverlay = !reportOverlay">Report</v-list-item-title >
                </v-list-item>
                <v-list-item>
                    <v-icon>mdi-heart</v-icon>
                    <v-list-item-title class="ml-1" style="cursor: pointer" @click="showListOfLikes">List of likes</v-list-item-title >
                </v-list-item>
            </v-list>
        </v-menu>

      </v-col>
    </v-row>

    <v-overlay
        :z-index="99"
        :value="reportOverlay"
        opacity="0.8"
        >
            <Report @cancel="reportOverlay = !reportOverlay" :postID="post.id"/>
      </v-overlay>

      <v-overlay
      :z-index="99"
      :value="likesOverlay"
      opacity="0.8"
      >
          <OverlayListOfProfile @cancel="likesOverlay = !likesOverlay" :profiles="listOfProfileLikedPost" />
      </v-overlay>

    <v-divider/>

    <div class="ma-3" v-html="content"></div>

    <v-divider/>

    <v-row class="mx-2">
      <v-col>
        <nuxt-link class="text-decoration-none white--text d-flex py-2"
                   :to="'/profile/'+author.username">
          <div>
            <UserAvatar
              class="profile-pic"
              color="primary"
              :avatar-string="author.username"
              :avatar-src="author.profile_picture"/>
          </div>
          <div class="d-flex flex-column ml-3">
            <span><b>{{ author.username }}</b></span>
            <span style="font-size: smaller">{{ author.first_name }} {{ author.last_name }}</span>
          </div>
        </nuxt-link>
      </v-col>
      <v-col
        class="text-right d-flex justify-end align-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :color="isLiked"
              @click="onLikePostClicked"
              v-bind="attrs"
              v-on="on"
              icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </template>
          <span>Like</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="setCommentToPost(isCommentToPostExpanded)"
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

    <v-row>
    </v-row>
  </v-card>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import UserAvatar from "../shared/UserAvatar";
  import Report from '~/components/shared/Report'
  import OverlayListOfProfile from '~/components/profile/OverlayListOfProfile'

  export default {
    name: 'PostView',
    components: { UserAvatar },
    data: () => ({
      reportOverlay: false,
      likesOverlay: false,
      listOfProfileLikedPost: [],
    }),
    computed: {
      ...mapGetters('modules/post', ['isCommentToPostExpanded']),
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
        },
      },
      isLiked() {
        if (this.post.is_liked) {
          return 'pink'
        } else {
          return ''
        }
      },
    },
    methods: {
      ...mapActions('modules/profile/profileLikes', ['getProfilesThatLikedPostByID']),
      ...mapActions('modules/post', ['setCommentToPost']),
      ...mapActions('modules/post', ['likePost']),
      ...mapActions('modules/post', ['dislikePost']),
      onLikePostClicked() {
        let liked = !this.post.is_liked;
        this.post.is_liked = !this.post.is_liked;
        if (!liked) {
          this.dislikePost({
            postId: this.post.id
          }).then(({ data }) => {
            this.post.is_liked = false;
            this.post.likes_number--;
          }).catch((error) => {
            this.post.is_liked = true;
            this.$notifier.showMessage({ content: error.message, color: 'error' })
          });
        } else {
          this.likePost({
            postId: this.post.id
          }).then(({ data }) => {
            this.post.is_liked = true;
            this.post.likes_number++;
          }).catch((error) => {
            this.post.is_liked = false;
            this.$notifier.showMessage({ content: error.message, color: 'error' })
          });
        }
      },
      showListOfLikes() {
          this.getProfilesThatLikedPostByID(this.post.id)
          .then((res) => {
              console.log(res)
              this.listOfProfileLikedPost = res
              this.likesOverlay = !this.likesOverlay
          })
          .catch((error) => {
              console.log(error)
          })
      },
    },
    props: ['post', 'author', 'content'],
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
