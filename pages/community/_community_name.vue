<template>
  <div>
    <Intro
      v-if="introData"
      v-show="!isPageLoading"
      :data="introData"
      :userJoined="isUserJoined"
      @userState="refreshPage"/>
    <HeaderLoader v-show="isPageLoading"/>

    <v-row class="pa-5">
      <v-col order-md="1" order="1" cols="12" md="3">
        <About v-if="introData" v-show="!isPageLoading" :about="introData.about" :name="introData.name"/>
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
      <v-col order-md="2" order="3" cols="12" md="6">
        <Write v-if="name" v-show="!isPageLoading" :community="name" @posted="getPosts"/>
        <WriteLoader v-show="isPageLoading"/>
        <br>
        <PostQuickView v-for="post in posts" v-if="posts" v-show="!isPageLoading" :key="post.id" :post="post"/>
        <PostQuickViewLoader v-for="i in 5" v-show="isPageLoading" :key="i"/>
      </v-col>
      <v-col order-md="3" order="2" cols="12" md="3">
        <People v-if="members" v-show="!isPageLoading" :people="members"/>
        <v-card v-show="isPageLoading" class="pa-2">
          <div class="ma-2">
            <v-skeleton-loader
              type="heading"/>
          </div>
          <div
            v-for="i in 10"
            :key="i"
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
  import PostQuickView from '@/components/shared/Post-quick-view'
  import About from "@/components/community/About";
  import Write from "@/components/shared/Write";
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
    this.getPeople();
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
      this.$axios.get(`api/community/get_community?name=${this.name}&summery=t`)
        .then(response => {
          this.introData = {
            id: response.data.community.id,
            name: response.data.community.name,
            logo: response.data.community.picture,
            banner: response.data.community.banner_picture,
            members: response.data.community.members_number,
            since: response.data.community.date_created,
            about: response.data.community.about
          };
          this.loading.isCommunityLoading = false;
          this.loading.isPostLoading = false;
        })
        .catch(e => {
          return this.$nuxt.error({ statusCode: 404, message: e.message })
        });
      },
      getPosts() {
        this.$axios.get(`api/community/community_posts?name=${this.name}`)
        .then(
          response => this.posts = response.data.posts
        ).catch(
          e => this.$nuxt.error({ statusCode: 404, message: e.message })
        );
      },
      getPeople() {
        this.$axios.get('api/community/community_members?name=' + this.name)
        .then(
          response => {
            this.members = response.data.members;
            const user = this.members.filter(u => u.username === this.$auth.user.username);
            this.isUserJoined = user.length === 1;
          })
        .catch(
          e => this.$nuxt.error({ statusCode: 404, message: e.message }))
      },
      refreshPage: function () {
        this.getPeople();
        this.getInfo();
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
