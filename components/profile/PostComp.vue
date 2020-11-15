<template>
    <v-container>
      <v-row v-if="hasImage">
        <v-col class="mx-5 header-image">
          <img alt="image"
              :src="getPostImage" @error="handleImageError">
        </v-col>
      </v-row>

      <v-row>
        <v-col class="mx-5 pb-1">
          <p class="mb-1">{{ post.postDescription }}</p>
        </v-col>
      </v-row>

      <v-row v-if="hasHashtag">
        <v-col class="d-flex justify-right ml-4">
          <v-chip
            nuxt
            :key="i"
            v-for="(tag, i) in post.postHashtags"
            :to="'/search/hashtag?keyword=' + tag + '&sort=latest'"
            outlined
            class="mx-1"
            :color="chipsColors[i]"
            >
            {{ '#' + tag }}
          </v-chip>
        </v-col>
      </v-row>
    </v-container>
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
            chipsColors: ['blue', 'red', 'green', 'purple', 'orange'],
            hasImage: true
        }
    },
    computed: {
        getPostImage() {
            return this.$axios.defaults.baseURL + this.post.postImageURL
        },
        hasHashtag() {
          if (!this.post.postHashtags || this.post.postHashtags.length == 0) {
            return false
          }
          return true
        }
    },
    methods: {
      handleImageError() {
        this.hasImage = false
      }
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