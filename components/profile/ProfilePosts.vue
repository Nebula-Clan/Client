<template>
    <v-container fluid class="py-2">
        <v-row ref="VCardParent">
            <v-card :min-width="vCardWidth">
                <v-list-item three-line>
                     <v-list-item-avatar tile size="80" color="grey">
                            <v-img :src="post.getPostImageURL()"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <div class="overline mb-3">
                            {{ post.getPostTitle() }}
                        </div>
                        <v-list-item-subtitle>
                            <v-row class="ml-1">
                                <p v-for="hashtag in post.getPostHashtags()" :key="hashtag" class="mx-1 blue--text text--lighten-1">
                                    {{ hashtag }}
                                </p>
                            </v-row>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-menu>
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                        </template>
                        <v-list elevation="24">
                            <v-list-item>
                                <v-list-item-title style="cursor: pointer" @click="overlay = !overlay">Report</v-list-item-title >
                                <v-icon>mdi-flag</v-icon>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title style="cursor: pointer" >Share</v-list-item-title>
                                <v-icon>mdi-share-variant</v-icon>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <v-overlay
                    :z-index="zIndex"
                    :value="overlay"
                    opacity="0.8"
                    >
                        <ProfileReport @cancel="overlay = !overlay" />
                    </v-overlay>

                    <v-btn icon class="ml-auto" :color="likedPost" @click="likePost">
                        <v-icon style="cursor: pointer">mdi-heart</v-icon>
                    </v-btn>

                    <v-btn icon class="mr-5 ml-4">
                        <v-icon style="cursor: pointer">mdi-comment</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>


<script>
import ProfileReport from './ProfileReport'

export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data: () => {
        return {
            like: false,
            dislike: false,
            overlay: false,
            zIndex: 1,
            vCardWidth: '0'
        }
    },
    computed: {
        likedPost() {
            if (!this.dislike && (this.liked || this.like)) {
                return 'pink'
            } else {
                return ''
            }
        }
    },
    mounted() {
        this.vCardWidth =  this.$refs.VCardParent.clientWidth
    },
    methods: {
        likePost() {
            if (!this.like) {
                this.like = true
                this.dislike = false
            } else {
                this.like = false
                this.dislike = true
            }
        }
    }
}
</script>

<style scoped>

</style>