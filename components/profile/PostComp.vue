<template>
    <v-list-item three-line>
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
    </v-list-item>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
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

<style scoped>

.post-title {
    font-size: 3rem;
    text-transform: none !important;
}

</style>