<template>
  <v-row class="px-10 py-5">
    <v-col
      cols="12"
      lg="2"
      md="3"
      sm="3">
      <Categories v-show="!isPageLoading"/>
      <MenuIconLoader v-show="isPageLoading"/>
    </v-col>
    <v-col
      cols="12"
      lg="8"
      md="6"
      sm="6">
      <Write @posted="getPosts" v-show="!isPageLoading"/>
      <WriteLoader v-show="isPageLoading"/>
      <br>
      <PostQuickView
        v-show="!isPageLoading"
        v-for="(post, i) in posts" :key="i" :post="post"/>
      <PostQuickViewLoader v-show="isPageLoading" v-for="i in 5"/>
    </v-col>
    <v-col
      cols="12"
      lg="2"
      md="3"
      sm="3">
            <User v-show="!isPageLoading" :user="this.$auth.user"/>
      <UserLoader v-show="isPageLoading"/>

      <br>
      <Communities
        v-show="!isPageLoading"
        :communities="communities"
        @refresh="refresh"/>
      <MenuIconLoader v-show="isPageLoading"/>
    </v-col>
  </v-row>
</template>

<script>
  import User from '@/components/homepage/User'
  import Categories from '@/components/homepage/Categories'
  import Communities from '@/components/homepage/Communities'
  import Write from '@/components/homepage/Write'
  import PostQuickView from '@/components/homepage/Post-quick-view'
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
        posts: null,
        communities: [],

        loading: {
          isPostLoading: true,
          isCategoryLoading: true,
          isCommunitiesLoading: true
        },
      }
    },
    mounted() {
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
      getPosts() {
        // Posts
        this.$axios.get('api/posts/home_posts?order_key=new')
          .then((res) => {
            this.posts = res.data.posts;
            this.loading.isPostLoading = false;
            this.loading.isCategoryLoading = false;
          })
          .catch(e => this.$notifier.showMessage({content: e.message, color: 'error'}));
        // Communities
        this.$axios.get('api/community/user_communities').then(
          ({data}) => {
            this.communities = data.communities;
            this.loading.isCommunitiesLoading = false;
          }
        ).catch(e => this.$notifier.showMessage({content: e.message, color: 'error'}));
      },
      refresh() {
        console.log('refresh');
        this.getPosts();
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
