<template>
  <v-row v-if="isLoading">
    <v-col
      v-for="index in 24"
      :key="index"
      class="d-flex child-flex"
      :cols="postColumns">
      <v-skeleton-loader
        elevation="2"
        type="image"/>
    </v-col>
  </v-row>
  <v-row v-else-if="posts.length > 0">
    <v-col
      v-for="(post, index) in posts"
      :key="index"
      class="d-flex child-flex"
      :cols="postColumns">
      <v-hover v-slot="{ hover }">
        <v-card
          class="mx-auto"
          color="grey lighten-4">
          <v-img
            :src="`${$axios.defaults.baseURL}/media/${post.header_image}`"
            :lazy-src="`https://picsum.photos/10/6?image=${index%30 + 10}`"
            aspect-ratio="1"
            class="rounded-0 grey lighten-2">
            <v-expand-transition>
              <v-card
                v-if="hover"
                height="100%"
                color="rounded-0 primary darken"
                class="mx-auto">
                <v-list-item>
                  <v-list-item-content>

                    <v-list-item-title class="headline mb-1 mt-4">
                      {{post.title}}
                    </v-list-item-title>

                  </v-list-item-content>

                  <UserAvatar
                    color="primary"
                    size="50"
                    class="mt-4"
                    :avatar-src="post.author.profile_picture"
                    :avatar-string="post.author.username"/>

                </v-list-item>

                <v-card-text>
                  {{$vuetify.breakpoint.xsOnly
                  ? post.description.substring(0,40) + "..."
                  : $vuetify.breakpoint.lgAndUp ? post.description.substring(0,200) + "..." :
                  post.description.substring(0,100) + "..." }}
                </v-card-text>

                <v-card-actions
                  class="see-more">
                  <v-btn
                    class="see-more-btn pa-2"
                    outlined
                    :to="`/posts/${post.id}`"
                    text>
                    See more...
                  </v-btn>
                </v-card-actions>

              </v-card>
            </v-expand-transition>
          </v-img>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
  <NoResult text="post" v-else/>
</template>

<script>
  import UserAvatar from "../shared/UserAvatar";
  import NoResult from "../shared/No-Result";

  export default {
    name: "Explore-Posts",
    components: { NoResult, UserAvatar },
    props: ['posts', 'isLoading'],
    computed: {
      postColumns() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return 6;
          case 'sm':
            return 6;
          case 'md':
            return 4;
          case 'lg':
            return 4;
          case 'xl':
            return 3;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .see-more {
    position: absolute;
    bottom: 0;
    right: 0;

    .see-more-btn {
      border: 3px solid white;
    }

  }
</style>