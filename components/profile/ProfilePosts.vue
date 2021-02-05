<template>
  <v-container fluid class="py-2">
    <v-row ref="VCardParent">
      <v-card
        :min-width="postWidth"
        :id="postID"
        class="layout-post"
        elevation="2"
      >
        <v-card-title>
          <v-row>
            <v-col class="ml-5">
              <nuxt-link
                class="text-decoration-none link"
                :to="`/posts/${post.postID}`"
              >
                <h2>{{ post.postTitle }}</h2>
              </nuxt-link>
              <div class="mr-2">
                <v-icon size="15"> mdi-clock </v-icon>
                <span style="font-size: smaller"> {{ getTimeElapse }}</span>
              </div>
            </v-col>

            <v-col class="text-right" cols="2">
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on" class="ml-auto">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list elevation="24">
                  <v-list-item>
                    <v-icon>mdi-flag</v-icon>
                    <v-list-item-title
                      class="ml-1"
                      style="cursor: pointer"
                      @click="reportOverlay = !reportOverlay"
                      >Report</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-icon>mdi-heart</v-icon>
                    <v-list-item-title
                      class="ml-1"
                      style="cursor: pointer"
                      @click="showListOfLikes"
                      >List of likes</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-icon>mdi-share-variant</v-icon>
                    <v-list-item-title class="ml-1" style="cursor: pointer"
                      >Share</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>

          <v-overlay :z-index="zIndex" :value="reportOverlay" opacity="0.8">
            <Report @cancel="reportOverlay = !reportOverlay" :postID="postID" />
          </v-overlay>

          <v-overlay :z-index="zIndex" :value="likesOverlay" opacity="0.8">
            <OverlayListOfProfile
              @cancel="likesOverlay = !likesOverlay"
              :profiles="listOfProfileLikedPost"
            />
          </v-overlay>
        </v-card-title>
        <PostComp :post="post" />
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn icon class="ml-auto" :color="likedPost" @click="likePost">
            <v-icon style="cursor: pointer">mdi-heart</v-icon>
          </v-btn>

          <v-btn icon class="mr-2 ml-4">
            <v-icon style="cursor: pointer">mdi-comment</v-icon>
          </v-btn>
        </v-card-actions>
        <div class="report" v-if="isReportedPost" id="report">
          <p>
            This post has been reported by several users. It may contain
            inappropriate content.
          </p>
          <v-btn @click="showPost" color="accent" outlined> Show post </v-btn>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>


<script>
import { mapActions } from "vuex";

import Report from "~/components/shared/Report";
import OverlayListOfProfile from "./OverlayListOfProfile";
import PostComp from "./PostComp";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {
      like: false,
      dislike: false,
      reportOverlay: false,
      likesOverlay: false,
      zIndex: 99,
      isMounted: false,
      hack: 0,
      listOfProfileLikedPost: [],
      isReported: false,
    };
  },
  computed: {
    likedPost() {
      if (!this.dislike && (this.post.isLiked || this.like)) {
        return "pink";
      } else {
        return "";
      }
    },
    postWidth() {
      this.hack;
      if (!this.isMounted) {
        return;
      }
      return this.$refs.VCardParent.clientWidth;
    },
    getPostImage() {
      return this.$axios.defaults.baseURL + this.post.postImageURL;
    },
    postID() {
      if (this.post.postID) {
        return this.post.postID;
      }
      return 1;
    },
    getTimeElapse() {
      const unixTime = new Date(this.post.postDate).getTime();
      const now = new Date().getTime();
      if (now - unixTime < 36e5) {
        return Math.floor((now - unixTime) / 60000) + " m";
      } else if (now - unixTime > 36e5 && now - unixTime < 36e5 * 24) {
        return Math.floor((now - unixTime) / 36e5) + " h";
      } else {
        return Math.floor((now - unixTime) / (36e5 * 24)) + " day(s)";
      }
    },
    isReportedPost() {
      return this.isReported;
    },
  },
  mounted() {
    this.isReported = this.post.isReported;
    this.vCardWidth = this.$refs.VCardParent.clientWidth;
    this.isMounted = true;
    if (this.post.isLiked) {
      this.like = true;
    }
    window.addEventListener("resize", this.hackWidth, { passive: true });
    this.hackWidth();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.hackWidth, { passive: true });
  },
  methods: {
    ...mapActions("modules/profile/profileLikes", [
      "getProfilesThatLikedPostByID",
    ]),
    ...mapActions("modules/profile/profileLikes", [
      "submitLikeAtPostWithID",
      "deleteLikeAtPostWithID",
    ]),
    showListOfLikes() {
      this.getProfilesThatLikedPostByID(this.postID)
        .then((res) => {
          console.log(res);
          this.listOfProfileLikedPost = res;
          this.likesOverlay = !this.likesOverlay;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    likePost() {
      if (!this.like) {
        this.submitLikeAtPostWithID(this.postID)
          .then(({ data }) => {
            this.like = true;
            this.dislike = false;
          })
          .catch((error) => {
            if (error.response.status == 403) {
              this.showErrorWithMessage("Please Login in or Sign Up");
            }
          });
      } else {
        this.deleteLikeAtPostWithID(this.postID)
          .then(({ data }) => {
            this.like = false;
            this.dislike = true;
          })
          .catch((error) => {
            if (error.response.status == 403) {
              this.showErrorWithMessage("Please Login in or Sign Up");
            }
          });
      }
    },
    hackWidth() {
      this.hack++;
    },
    showErrorWithMessage(message) {
      this.$notifier.showMessage({ content: message, color: "error" });
    },
    showPost: function () {
      this.isReported = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-post {
  position: relative;
  .report {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(15px);
    padding: 50px;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>