<template>
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
            :to="'/search/hashtag?keyword=' + tag + '&sort=latest'"
            outlined
            class="mx-1"
            :color="chipsColors[i]"
            >
            {{ '#' + tag }}
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
            chipsColors: ['blue', 'red', 'green', 'purple', 'orange']
        }
    },
    computed: {
        getPostImage() {
            return this.$axios.defaults.baseURL + this.post.postImageURL
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