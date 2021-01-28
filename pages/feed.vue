<template>
  <v-row class="px-10 py-5">
    <v-col
      cols="12"
      lg="2"
      md="3"
      order="3"
      order-md="1"
      sm="3">
      <Categories v-show="!isPageLoading"/>
      <MenuIconLoader v-show="isPageLoading" :number-of-items="3"/>
    </v-col>
    <v-col
      cols="12"
      lg="8"
      md="6"
      order="2"
      order-md="2"
      sm="6">
      <Write v-show="!isPageLoading" @posted="getPosts"/>
      <WriteLoader v-show="isPageLoading"/>
      <br>
      <LazyPostQuickView
        v-for="(post, i) in posts"
        v-show="!isPageLoading" :key="i" :post="post"/>
      <PostQuickViewLoader v-for="i in 3" :key="i" v-show="isPageLoading"/>
      <div class="ma-8 text-center">
        <v-progress-circular
          v-if="isLoadingOlderContent"
          size="70"
          width="5"
          indeterminate
          color="purple">
        </v-progress-circular>
      </div>
    </v-col>

    <v-col
      cols="12"
      lg="2"
      md="3"
      order="1"
      order-md="3"
      sm="3">
      <User v-show="!isPageLoading" :user="this.$auth.user"/>
      <UserLoader v-show="isPageLoading"/>

      <br>
      <Communities
        v-show="!isPageLoading"
        :communities="communities"
        @refresh="refresh"/>
      <MenuIconLoader v-show="isPageLoading" :number-of-items="3"/>
    </v-col>
  </v-row>
</template>

<script>
import User from '@/components/homepage/User'
import Categories from '@/components/homepage/Categories'
import Communities from '@/components/homepage/Communities'
import Write from '@/components/shared/Write'
import PostQuickView from '@/components/shared/Post-quick-view'
import PostQuickViewLoader from "../components/homepage/Post-Quick-View-Loader";
import MenuIconLoader from "../components/homepage/Menu-Icon-Loader";
import WriteLoader from "../components/homepage/Write-Loader";
import UserLoader from "../components/homepage/User-Loader";

export default {
  name: 'feed',
  components: {
    UserLoader,
    WriteLoader,
    MenuIconLoader,
    PostQuickViewLoader,
    User,
    Categories,
    Communities,
    Write,
    PostQuickView
  },
  data() {
    return {
      posts: [],
      communities: [],
      pageNumber: 0,
      loading: {
        isPostLoading: true,
        isCategoryLoading: true,
        isCommunitiesLoading: true,
      },
      isLoadingOlderContent: false
    }
  },
  mounted() {
    this.getPosts();
    this.getCommunities();
    this.loadOlderPosts();
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
    getPosts() {
      this.$axios.get(`api/posts/home_posts?offset=${this.pageNumber}`)
        .then((res) => {
          if (res.data.posts.length === 0){
            this.pageNumber = -1;
            this.isLoadingOlderContent = false;
          }
          this.posts = this.posts.concat(res.data.posts);
          this.loading.isPostLoading = false;
          this.loading.isCategoryLoading = false;
          this.loading.olderContent = false;
        }).catch(
          e => {
            this.$notifier.showMessage({content: e.message, color: 'error'});
            this.pageNumber -= 1;
            }
          );
    },
    getCommunities: function () {
      this.$axios.get('api/community/user_communities?offset=0').then(
        ({data}) => {
          this.communities = data.communities;
          this.loading.isCommunitiesLoading = false;
        }
      ).catch(e => this["$notifier"].showMessage({content: e.message, color: 'error'}));
    },
    refresh() {
      this.getCommunities();
    },
    loadOlderPosts: function () {
        window.onscroll = () => {
          let bottomOfWindow = Math.max(window.pageYOffset,
          document.documentElement.scrollTop, document.body.scrollTop)
            + window.innerHeight === document.documentElement.offsetHeight

          if (this.pageNumber === -1) {
            return
          }

          if (bottomOfWindow && !this.isLoadingOlderContent) {
            this.pageNumber += 1;
            this.isLoadingOlderContent = true;
            this.getPosts();
          }
        }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
