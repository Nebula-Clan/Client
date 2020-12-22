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

      <v-row v-if="menuName === 'ALL'">
        <v-col
          v-for="n in 30"
          :key="n"
          class="d-flex child-flex"
          cols="3">
          <v-img
            :src="`https://picsum.photos/500/300?image=${n + 10}`"
            :lazy-src="`https://picsum.photos/10/6?image=${n + 10}`"
            aspect-ratio="1"
            class="grey lighten-2">
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"/>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>

      <v-card
        v-else-if="menuName === 'PEOPLE'"
        class="mx-auto pt-2"
        max-width="100%"
        tile>
        <span class="ml-2 pt-2 text-caption">Accounts</span>
        <v-list dense>
          <v-list-item-group
            color="primary">
            <v-list-item
              v-for="(chat, i) in recent"
              :key="i">
              <v-list-item-avatar>
                <UserAvatar :avatar-src="chat.avatar"/>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="chat.title"/>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>

      <v-card
        v-else-if="menuName === 'HASHTAGS'"
        class="mx-auto pt-2"
        max-width="100%"
        tile>
        <span class="ml-2 pt-2 text-caption">Hashtags</span>
        <v-list dense>
          <v-list-item-group
            color="primary">
            <v-list-item
              v-for="n in 25"
              :key="n">
              <v-icon class="py-2 pr-4" size="35">
                mdi-tag-outline
              </v-icon>
              <v-list-item-content>
                {{`Tag number ${n}`}}
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>


      <!--      <Categories v-show="!isPageLoading"/>-->
      <v-card
        v-else-if="menuName==='CATEGORIES'"
        class="mx-auto pt-2"
        max-width="100%"
        tile>
        <span class="ml-2 text-caption">Categories</span>
        <CategoriesList :categories="categories" avatarSize="35" avatarPadding="py-2"/>
      </v-card>

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
  import CategoriesList from "@/components/shared/Categories-List";
  import UserAvatar from "~/components/shared/UserAvatar";

  import {mapActions} from "vuex";

  const ALL = "ALL";
  const PEOPLE = "PEOPLE";
  const HASHTAGS = "HASHTAGS";
  const CATEGORIES = "CATEGORIES";

  export default {
    name: "explore",
    components: { CategoriesList, UserAvatar },
    mounted() {
      this.fetchCategories();

      setInterval(() => {
        // console.log(this.pageIndex);
        // console.log(this.menuName);
        console.log(PEOPLE)
      }, 1000)
    },
    data: () => ({
      pageIndex: 0,

      recent: [
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Jason Oner',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mike Carlson',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Cindy Baker',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Ali Connors',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Jason Oner',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mike Carlson',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Cindy Baker',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Ali Connors',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Jason Oner',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mike Carlson',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Cindy Baker',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Ali Connors',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Jason Oner',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mike Carlson',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Cindy Baker',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Ali Connors',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Jason Oner',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mike Carlson',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Cindy Baker',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Ali Connors',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Jason Oner',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mike Carlson',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Cindy Baker',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Ali Connors',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Jason Oner',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mike Carlson',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Cindy Baker',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Ali Connors',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Jason Oner',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mike Carlson',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Cindy Baker',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Ali Connors',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Jason Oner',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mike Carlson',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Cindy Baker',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Ali Connors',
        },
      ],


      categories: []
    }),
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
      fetchCategories() {
        this.getAllCategories()
        .then(({ data }) => {
          console.log(data.categories);
          this.categories = data.categories;
        })
        .catch(error => this.$notifier.showMessage({ content: error.message, color: 'error' }))
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