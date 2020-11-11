<template>
    <!-- <v-list-item three-line>
        <v-list-item-avatar tile size="80" color="grey">
            <v-img :src="getPostImage"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <div class="overline mb-3">
                {{ post.postTitle }}
            </div>
            <v-list-item-subtitle>
                <v-row class="ml-1">
                    <p v-for="hashtag in post.postHashtags" :key="hashtag" class="mx-1 blue--text text--lighten-1">
                        {{ '#' + hashtag }}
                    </p>
                </v-row>
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item> -->
    <v-card class="my-2 pa-1" elevation="2">

    <v-row>
      <v-col class="mx-5 header-image">
        <img alt="image"
             :src="getPostImage">
      </v-col>
    </v-row>

    <v-row>
      <v-col class="mx-5">
        <p>{{ post.postDescription }}</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center">
        <v-chip
          nuxt
          :key="i"
          v-for="(tag, i) in post.postHashtags"
          :to="'/search/hashtag?keyword=' + tag.replace('#', '') + '&sort=latest'"
          outlined
          class="mx-1"
          :color="chipsColors[i]"
          >
          {{tag}}
        </v-chip>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            hashtags: ['sdf', 'sdfs', 'sdfds'],
            chipsColors: ['blue', 'red', 'green', 'purple', 'orange']
        }
    },
    computed: {
        getPostImage() {
            return this.$axios.defaults.baseURL + this.post.postImageURL
        }
    },
    mounted() {
        console.log(this.post.postHashtags)
    }
}
</script>

<style lang="scss" scoped>

.post-title {
    font-size: 3rem;
    text-transform: none !important;
}

.header-image {
  text-align: center;
  img {
    width: 90%;
    height: 250px;
    border-radius: 5px;
  }
}

</style>