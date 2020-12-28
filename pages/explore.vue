<template>
  <v-row class="px-10 py-5">


    <!--    <v-sheet-->
    <!--      class="mx-auto"-->
    <!--      max-width="100%">-->
    <!--      <v-slide-group-->
    <!--        multiple-->
    <!--        show-arrows>-->
    <!--        <v-slide-item-->
    <!--          v-for="n in 25"-->
    <!--          :key="n"-->
    <!--          v-slot="{ active, toggle }">-->
    <!--          <v-btn-->
    <!--            class="mx-2"-->
    <!--            :input-value="active"-->
    <!--            active-class="purple white&#45;&#45;text"-->
    <!--            depressed-->
    <!--            color="#00000000">-->
    <!--            Options {{ n }}-->
    <!--          </v-btn>-->
    <!--        </v-slide-item>-->
    <!--      </v-slide-group>-->
    <!--    </v-sheet>-->

    <v-col
      cols="12"
      xl="1"
      lg="1"
      md="1"
      sm="0"/>

    <v-col
      class="mb-10"
      cols="12"
      xl="10"
      lg="10"
      md="10"
      sm="12">

      <v-chip
        v-if="!isKeywordEmpty(this.$route.query)"
        class="mb-4 "
        color="blue darken-2"
        label>
        <v-icon left>
          mdi-magnify
        </v-icon>
        {{this.$route.query.keyword}}
      </v-chip>

      <ExplorePosts v-show="menuName === 'ALL'" :posts="posts" :is-loading="isPageLoading"/>
      <ExplorePeople v-show="menuName === 'PEOPLE'" :people="people" :is-loading="isPageLoading"/>
      <ExploreCommunities v-show="menuName === 'COMMUNITIES'" :communities="communities" :is-loading="isPageLoading"/>
      <ExploreHashtags v-show="menuName === 'HASHTAGS'" :hashtags="hashtags" :is-loading="isPageLoading"/>
      <ExploreCategories v-show="menuName==='CATEGORIES'" :categories="categories" :is-loading="isPageLoading"/>

    </v-col>

    <v-col
      cols="12"
      xl="1"
      lg="1"
      md="1"
      sm="0"/>

    <div>
      <div class="explore-nav">

        <v-bottom-navigation
          background-color="primary darken-4"
          v-model="pageIndex"
          class="pb-1"
          color="accent">

          <v-btn>
            <span class="pt-1">Explore</span>
            <v-icon>mdi-compass</v-icon>
          </v-btn>

          <v-btn>
            <span class="pt-1">People</span>
            <v-icon>mdi-account-outline</v-icon>
          </v-btn>

          <v-btn>
            <span class="pt-1">Communities</span>
            <v-icon>mdi-account-multiple-outline</v-icon>
          </v-btn>

          <v-btn>
            <span class="pt-1">Hashtags</span>
            <v-icon>mdi-tag-multiple</v-icon>
          </v-btn>

          <v-btn>
            <span class="pt-1">Categories</span>
            <v-icon>mdi-tag-faces</v-icon>
          </v-btn>

        </v-bottom-navigation>
      </div>
    </div>

  </v-row>
</template>

<script>
  import ExplorePosts from "../components/explore/Explore-Posts";
  import ExplorePeople from "../components/explore/Explore-People";
  import ExploreHashtags from "../components/explore/Explore-Hashtags";
  import ExploreCategories from "../components/explore/Explore-Categories";
  import {mapActions} from "vuex";
  import ExploreCommunities from "../components/explore/Explore-Communities";

  const ALL = "ALL";
  const PEOPLE = "PEOPLE";
  const COMMUNITIES = "COMMUNITIES";
  const HASHTAGS = "HASHTAGS";
  const CATEGORIES = "CATEGORIES";

  export default {
    name: "explore",
    components: { ExploreCommunities, ExploreCategories, ExploreHashtags, ExplorePeople, ExplorePosts },
    data: () => ({
      pageIndex: 0,

      posts: [],
      people: [],
      communities: [],
      categories: [],
      hashtags: [],

      loading: {
        isPostLoading: true,
        isCategoryLoading: true,
        isHashtagsLoading: true,
        isUsersLoading: true,
        isCommunitiesLoading: true
      },
    }),
    mounted() {
      this.explore();
    },
    computed: {
      isPageLoading() {
        for (const [key, value] of Object.entries(this.loading)) {
          if (value) {
            return true;
          }
        }
        return false
      },
      menuName() {
        switch (this.pageIndex) {
          case 0:
            return ALL;
          case 1:
            return PEOPLE;
          case 2:
            return COMMUNITIES;
          case 3:
            return HASHTAGS;
          case 4:
            return CATEGORIES;
          default:
            return;
        }
      },
      color() {
        switch (this.value) {
          case 0:
            return 'blue-grey';
          case 1:
            return 'teal';
          case 2:
            return 'brown';
          case 3:
            return 'indigo';
          default:
            return 'blue-grey';
        }
      },
    },
    methods: {
      ...mapActions('modules/category/category', ['getAllCategories']),
      ...mapActions('modules/explore', ['getExplorePosts']),
      ...mapActions('modules/explore', ['getExplorePeople']),
      ...mapActions('modules/explore', ['searchPosts']),
      ...mapActions('modules/explore', ['searchHashtags']),
      ...mapActions('modules/explore', ['searchCategories']),
      ...mapActions('modules/explore', ['searchCommunities']),
      explore() {
        this.loading = {
          isPostLoading: true,
          isCategoryLoading: true,
          isCommunitiesLoading: true,
          isHashtagsLoading: true,
          isUsersLoading: true
        };
        this.fetchPosts();
        this.fetchPeople();
        this.fetchCommunities();
        this.fetchHashtags();
        this.fetchCategories();
      },
      fetchPosts() {
        if (this.isKeywordEmpty(this.$route.query)) {
          let category = this.isCategoryEmpty(this.$route.query) ? "" : this.$route.query.category;
          this.getExplorePosts({
            category
          })
          .then(({ data }) => {
            this.posts = data.posts;
            this.loading.isPostLoading = false;
          })
          .catch(error => this.$notifier.showMessage({ content: error.message, color: 'error' }))
        } else {
          this.searchPosts({
            keyword: this.$route.query.keyword
          })
          .then(({ data }) => {
            this.posts = data.posts_finded;
            this.loading.isPostLoading = false;
          })
          .catch(error => this.$notifier.showMessage({ content: error.message, color: 'error' }))
        }
      },
      fetchCategories() {
        if (this.isKeywordEmpty(this.$route.query)) {
          this.getAllCategories()
          .then(({ data }) => {
            this.categories = data.categories;
            this.loading.isCategoryLoading = false;
          })
          .catch(error => this.$notifier.showMessage({ content: error.message, color: 'error' }))
        } else {
          this.searchCategories({
            keyword: this.$route.query.keyword
          })
          .then(({ data }) => {
            this.categories = data.categories;
            this.loading.isCategoryLoading = false;
          })
          .catch(error => this.$notifier.showMessage({ content: error.message, color: 'error' }))
        }
      },
      fetchPeople() {
        let keyword = this.isKeywordEmpty(this.$route.query) ? undefined : this.$route.query.keyword;
        this.getExplorePeople({
          keyword
        })
        .then(({ data }) => {
          this.people = data.users_finded;
          this.loading.isUsersLoading = false;
        })
        .catch(error => this.$notifier.showMessage({ content: error.message, color: 'error' }))
      },
      fetchHashtags() {
        let keyword = this.isKeywordEmpty(this.$route.query) ? undefined : this.$route.query.keyword;
        this.searchHashtags({
          keyword
        })
        .then(({ data }) => {
          this.hashtags = data.hashtags;
          this.loading.isHashtagsLoading = false;
        })
        .catch(error => this.$notifier.showMessage({ content: error.message, color: 'error' }))
      },
      fetchCommunities() {
        let keyword = this.isKeywordEmpty(this.$route.query) ? undefined : this.$route.query.keyword;
        this.searchCommunities({
          keyword
        })
        .then(({ data }) => {
          this.communities = data.communities;
          this.loading.isCommunitiesLoading = false;
        })
        .catch(error => this.$notifier.showMessage({ content: error.message, color: 'error' }))
      },
      isCategoryEmpty(queries) {
        if (queries === undefined) return true;
        if (queries.category === undefined) return true;
        if (queries.category === null) return true;
        return queries.category === "";
      },
      isKeywordEmpty(queries) {
        if (queries === undefined) return true;
        if (queries.keyword === undefined) return true;
        if (queries.keyword === null) return true;
        return queries.keyword === "";
      }
    },
    watch: {
      '$route.query.keyword': function () {
        this.explore();
      },
      '$route.query.category': function () {
        this.pageIndex = 0;
        this.explore();
      },
      '$route.query.hashtag': function () {
        this.explore();
      },
    }
  }
</script>

<style scoped>
  .explore-nav {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>