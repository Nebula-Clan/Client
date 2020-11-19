<template>
  <v-row class="px-10 py-5">
    <v-col
      cols="12"
      lg="2"
      md="3"
      sm="3">
<!--      <Categories v-show="!isCommunitiesLoading"/>-->
      <MenuIconLoader v-show="true"/>
    </v-col>
    <v-col
      cols="12"
      lg="8"
      md="6"
      sm="6">
      <Write @posted="getPosts" v-show="false"/>
      <WriteLoader v-show="true"/>
      <br>
      <PostQuickView
        v-show="false"
        v-for="(post, i) in posts" :key="i" :post="post"/>
      <PostQuickViewLoader v-show="true" v-for="i in 5"/>
    </v-col>
    <v-col
      cols="12"
      lg="2"
      md="3"
      sm="3">
      <!--      <User :user="this.$auth.user"/>-->
      <UserLoader v-show="true"/>

      <br>
<!--      <Communities-->
<!--        v-show="!isCommunitiesLoading"-->
<!--        :communities="communities"-->
<!--        @refresh="refresh"/>-->
      <MenuIconLoader v-show="true"/>
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

        isPostLoading: true,
        isCommunitiesLoading: true
      }
    },
    methods: {
      getPosts() {
        // Posts
        this.$axios.get('api/posts/home_posts?order_key=new')
          .then((res) => {
            this.posts = res.data.posts;
            this.isPostLoading = false;
          })
          .catch(e => this.$notifier.showMessage({content: e.message, color: 'error'}));
        // Communities
        this.$axios.get('api/community/user_communities').then(
          ({data}) => {
            this.communities = data.communities;
            this.isCommunitiesLoading = false;
          }
        ).catch(e => this.$notifier.showMessage({content: e.message, color: 'error'}));
      },
      refresh() {
        console.log('refresh');
        this.getPosts();
      }
    },
    mounted() {
      this.getPosts();
    }
  }
</script>

<style lang="scss" scoped>

</style>
