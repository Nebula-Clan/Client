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

      <ExplorePosts v-show="menuName === 'ALL'" :posts="posts"/>
      <ExplorePeople v-show="menuName === 'PEOPLE'" :people="people"/>
      <ExploreHashtags v-show="menuName === 'HASHTAGS'" :hashtags="hashtags"/>
      <ExploreCategories v-show="menuName==='CATEGORIES'" :categories="categories"/>

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

  const ALL = "ALL";
  const PEOPLE = "PEOPLE";
  const HASHTAGS = "HASHTAGS";
  const CATEGORIES = "CATEGORIES";

  export default {
    name: "explore",
    components: { ExploreCategories, ExploreHashtags, ExplorePeople, ExplorePosts },
    data: () => ({
      pageIndex: 0,
      posts: [],
      people: [],
      categories: [],
      hashtags: []
    }),
    mounted() {
      this.fetchPosts();
      this.fetchPeople();
      this.fetchHashtags();
      this.fetchCategories();
    },
    computed: {
      menuName() {
        switch (this.pageIndex) {
          case 0:
            return ALL;
          case 1:
            return PEOPLE;
          case 2:
            return HASHTAGS;
          case 3:
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
      fetchPosts() {
        if (this.isEmpty(this.$route.query)) {
          this.getExplorePosts()
          .then(({ data }) => {
            this.posts = data.posts;
          })
          .catch(error => this.$notifier.showMessage({ content: error.message, color: 'error' }))
        } else {
          this.searchPosts({
            keyword: this.$route.query.keyword
          })
          .then(({ data }) => {
            console.log(data.posts_finded);
            this.posts = data.posts_finded;
          })
          .catch(error => this.$notifier.showMessage({ content: error.message, color: 'error' }))
        }
      },
      fetchCategories() {
        this.getAllCategories()
        .then(({ data }) => {
          this.categories = data.categories;
        })
        .catch(error => this.$notifier.showMessage({ content: error.message, color: 'error' }))
      },
      fetchPeople() {
        let keyword = this.isEmpty(this.$route.query) ? undefined : this.$route.query.keyword;
        this.getExplorePeople({
          keyword
        })
        .then(({ data }) => {
          this.people = data.users_finded
        })
        .catch(error => this.$notifier.showMessage({ content: error.message, color: 'error' }))
      },
      fetchHashtags() {
        this.$axios.$get("api/hashtag/similarity?&text=a").then(
          response => {
            this.hashtags = response.hashtags
          }
        )
        .catch(error => this.$notifier.showMessage({ content: error.message, color: 'error' }))
      },
      isEmpty(queries) {
        if (queries === undefined) return true;
        if (queries.keyword === undefined) return true;
        if (queries.keyword === null) return true;
        return queries.keyword === "";
      }
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