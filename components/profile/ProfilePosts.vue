<template>
     <v-container fluid class="py-2">
        <v-row ref="VCardParent">
            <v-card :min-width="postWidth" :id="postID">
                <v-card-title>
                    <v-row>
                        <v-col class="ml-5">
                            <nuxt-link class="text-decoration-none white--text" to="#">
                            <h2>{{ post.postTitle }}</h2>
                            </nuxt-link>
                            <div class="mr-2">
                            <v-icon size="15">
                                mdi-clock
                            </v-icon>
                            <span style="font-size: smaller"> {{ getTimeElapse }}</span>
                            </div>
                        </v-col>

                        <v-col
                            class="text-right"
                            cols="2">
                            <v-menu>
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on" class="ml-auto">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                        </template>
                        <v-list elevation="24">
                            <v-list-item>
                                <v-list-item-title style="cursor: pointer" @click="reportOverlay = !reportOverlay">Report</v-list-item-title >
                                <v-icon>mdi-flag</v-icon>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title style="cursor: pointer" @click="showListOfLikes">ListOfLikes</v-list-item-title >
                                <v-icon>mdi-heart</v-icon>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title style="cursor: pointer" >Share</v-list-item-title>
                                <v-icon>mdi-share-variant</v-icon>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                        </v-col>
                    </v-row>

                    <v-overlay
                    :z-index="zIndex"
                    :value="reportOverlay"
                    opacity="0.8"
                    >
                        <ProfileReport @cancel="reportOverlay = !reportOverlay" />
                    </v-overlay>

                    <v-overlay
                    :z-index="zIndex"
                    :value="likesOverlay"
                    opacity="0.8"
                    >
                        <OverlayListOfProfile @cancel="likesOverlay = !likesOverlay" :profiles="listOfProfileLikedPost" />
                    </v-overlay>
                </v-card-title>
                <PostComp :post="post" />
                <v-divider></v-divider>
                <v-card-actions>

                    <v-btn icon class="ml-auto" :color="likedPost" @click="likePost">
                        <v-icon style="cursor: pointer">mdi-heart</v-icon>
                    </v-btn>

                    <v-btn icon class="mr-2 ml-4">
                        <v-icon style="cursor: pointer">mdi-comment</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>


<script>
import { mapActions } from 'vuex'

import ProfileReport from './ProfileReport'
import OverlayListOfProfile from './OverlayListOfProfile'
import PostComp from './PostComp'

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
            reportOverlay: false,
            likesOverlay: false,
            zIndex: 99,
            isMounted: false,
            hack: 0,
            listOfProfileLikedPost: []
        }
    },
    computed: {
        likedPost() {
            if (!this.dislike && (this.post.isLiked || this.like)) {
                return 'pink'
            } else {
                return ''
            }
        },
        postWidth() {
            this.hack
            if (!this.isMounted) {
                return;
            }
            return this.$refs.VCardParent.clientWidth
        },
        getPostImage() {
            return this.$axios.defaults.baseURL + this.post.postImageURL
        },
        postID() {
            if (this.post.postID) {
                return this.post.postID
            }
            return 1
        },
        getTimeElapse() {
            const unixTime = new Date(this.post.postDate).getTime()
            const now = new Date().getTime()
            if (now - unixTime < 36e+5) {
            return Math.floor((now - unixTime) / 60000) + ' m'
            } else if (now - unixTime > 36e+5 && now - unixTime < 36e+5 * 24) {
            return Math.floor((now - unixTime) / 36e+5) + ' h'
            } else {
            return Math.floor((now - unixTime) / (36e+5 * 24)) + ' day(s)'
            }
        }
    },
    mounted() {
        this.vCardWidth =  this.$refs.VCardParent.clientWidth
        this.isMounted = true
        if (this.post.isLiked) {
            this.like = true
        }
        window.addEventListener('resize', this.hackWidth, { passive: true })
        this.hackWidth()
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.hackWidth, { passive: true })
    },
    methods: {
        ...mapActions('modules/profile/profileLikes', ['getProfilesThatLikedPostByID']),
        ...mapActions('modules/profile/profileLikes', ['submitLikeAtPostWithID', 'deleteLikeAtPostWithID']),
        showListOfLikes() {
            this.getProfilesThatLikedPostByID(this.postID)
            .then((res) => {
                console.log(res)
                this.listOfProfileLikedPost = res
                this.likesOverlay = !this.likesOverlay
            })
            .catch((error) => {
                console.log(error)
            })
        },
        likePost() {
            if (!this.like) {
                this.submitLikeAtPostWithID(this.postID)
                .then(({ data }) => {
                    this.like = true
                    this.dislike = false
                })
                .catch((error) => {

                })
            } else {
                this.deleteLikeAtPostWithID(this.postID)
                .then(({ data }) => {
                    this.like = false
                    this.dislike = true
                })
                .catch((error) => {

                })
            }
        },
        hackWidth() {
            this.hack++
        }
    }
}
</script>

<style scoped>

</style>