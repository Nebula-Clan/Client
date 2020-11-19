<template>
  <div>
    <Intro
      @userState="getInfo"
      v-show="!isPageLoading"
      v-if="introData"
      :data="introData"
      :userJoined="isUserJoined"/>
    <HeaderLoader v-show="isPageLoading"/>

    <v-row class="pa-5">
      <v-col cols="3">
        <About v-show="!isPageLoading" v-if="introData" :name="introData.name" :about="introData.about"/>
        <v-card v-show="isPageLoading" class="pa-2">
          <div class="ma-2">
            <v-skeleton-loader
              type="heading"/>
          </div>
          <div
            class="ma-2">
            <v-skeleton-loader
              type="paragraph, paragraph, paragraph, paragraph"/>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <Write v-show="!isPageLoading" v-if="name" :community="name" @posted="getPosts"/>
        <WriteLoader v-show="isPageLoading"/>

        <PostQuickView v-show="!isPageLoading" v-if="posts" :key="post.id" v-for="post in posts" :post="post"/>
        <PostQuickViewLoader v-show="isPageLoading" v-for="i in 5"/>
      </v-col>
      <v-col cols="3">
        <People v-show="!isPageLoading" v-if="members" :people="members"/>
        <v-card v-show="isPageLoading" class="pa-2">
          <div class="ma-2">
            <v-skeleton-loader
              type="heading"/>
          </div>
          <div
            v-for="i in 10"
            class="ma-2">
            <v-skeleton-loader
              type="list-item-avatar"/>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import Intro from "@/components/community/Header";
  import People from "@/components/community/People";
  import PostQuickView from '@/components/homepage/Post-quick-view'
  import About from "@/components/community/About";
  import Write from "@/components/homepage/Write";
  import WriteLoader from "../../components/homepage/Write-Loader";
  import HeaderLoader from "../../components/community/Header-Loader";
  import PostQuickViewLoader from "../../components/homepage/Post-Quick-View-Loader";

  export default {
    name: "communityName",
    components: {
      PostQuickViewLoader,
      HeaderLoader,
      WriteLoader,
      Write,
      About,
      People,
      Intro,
      PostQuickView
    },
    data() {
      return {
        introData: null,
        isUserJoined: false,
        members: null,
        posts: null,
        name: null,

        loading: {
          isPostLoading: true,
          isCommunityLoading: true
        }
      }
    },
    mounted() {
      this.getInfo();
      this.getPosts();
    },
    computed: {
      isPageLoading() {
        for (const [key, value] of Object.entries(this.loading)) {
          if (value) {
            return true;
          }
        }
        return false
      }
    },
    methods: {
      getInfo() {
        this.name = this.$route.params.community_name;
        this.$axios.get(`api/community/get_community?name=${this.name}&summery=f`)
          .then(
            ({data}) => {
              this.introData = {
                id: data.community.id,
                name: data.community.name,
                logo: data.community.picture,
                banner: data.community.banner_picture,
                members: data.community.members_number,
                since: data.community.date_created,
                about: data.community.about
              };
              this.members = data.community.members;
              const user = this.members.filter(u => u.username === this.$auth.user.username);
              this.isUserJoined = user.length === 1;
              // this.posts = data.community.posts

              this.loading.isCommunityLoading = false
            }
          ).catch(
          e => this.$notifier.showMessage({content: e.message, color: 'error'})
        );
      },
      getPosts() {
        this.$axios.get(`api/community/community_posts?name=${this.name}`).then(
          ({data}) => {
            this.posts = data.posts;
            this.loading.isPostLoading = false;
          }
        ).catch(
          e => this.$notifier.showMessage({content: e.message, color: 'error'})
        );
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
