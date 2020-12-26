<template>
  <v-row>
    <v-col
      v-for="n in 30"
      :key="n"
      class="d-flex child-flex"
      :cols="postColumns">
      <v-hover v-slot="{ hover }">
        <v-card
          class="mx-auto"
          color="grey lighten-4">
          <v-img
            :src="`https://picsum.photos/500/300?image=${n + 10}`"
            :lazy-src="`https://picsum.photos/10/6?image=${n + 10}`"
            aspect-ratio="1"
            class="rounded-0 grey lighten-2">
            <v-expand-transition>
              <v-card
                v-if="hover"
                height="100%"
                color="rounded-0 primary darken-4"
                class="mx-auto">
                <v-list-item>
                  <v-list-item-content>

                    <v-list-item-title class="headline mb-1">
                      Headline 5
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      Greyhound divisely hello coldly fonwderfully. Greyhound divisely hello coldly
                      fonwderfully. Greyhound divisely hello coldly fonwderfully
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-avatar
                    tile
                    color="grey"/>

                </v-list-item>

                <v-card-actions>
                  <v-btn
                    outlined
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
</template>

<script>
  export default {
    name: "Explore-Posts",
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

<style scoped>

</style>