<template>
    <v-container fluid>
        <v-row>
            <v-img :src="getProfileBanner" :lazy-src="'/images/login-background.jpg'" :eager="true" @error="defaultBanner" max-height="450">
                <template v-slot:placeholder>
                    <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                    >
                    <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                    ></v-progress-circular>
                    </v-row>
                </template>
            </v-img> 
        </v-row>
        <v-row>
            <v-container fluid class="pa-0">
                <div style="background-color:#12232E">
                    <v-container class="pa-0">
                        <v-row justify="center" align="center">
                            <v-col cols="2" lg="1" sm="2" xs="2" :class="getPaddingAndMargin">
                                <p class="text-center mb-0 text--secondary">
                                    Posts
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    {{ profile.numberOfPosts }}
                                </p>
                            </v-col>
                            <v-col cols="2" lg="1" sm="2" xs="2" :class="getPaddingAndMargin">
                                <p class="text-center mb-0 text--secondary">
                                    Following
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    {{ profile.numberOfFollowing }}
                                </p>
                            </v-col>
                            <v-col cols="2" lg="1" sm="2" xs="2" :class="getPaddingAndMargin">
                                <p class="text-center mb-0 text--secondary">
                                    Followers
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    {{ profile.numberOfFollowers }}
                                </p>
                            </v-col>
                            <v-col cols="2" lg="1" sm="2" xs="2" :class="getPaddingAndMargin">
                                <p class="text-center mb-0 text--secondary">
                                    Likes
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    {{ profile.numberOfLikes }}
                                </p>
                            </v-col>
                            <v-col cols="2" lg="1" sm="2" xs="2" :class="getPaddingAndMargin">
                                <p class="text-center mb-0 text--secondary">
                                    Comments
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    {{ profile.numberOfComments }}
                                </p>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
            </v-container>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            bannerImageForError: '/images/login-background.jpg',
            hasError: false,
            isCompleted: false
        }
    },
    computed: {
        ...mapGetters('modules/profile/profileInfo',['getProfile', 'getStatusOfReq']),
        getPaddingAndMargin() {
            if (this.$vuetify.breakpoint.xl) {
                return 'pa-2 mx-10'
            } else if (this.$vuetify.breakpoint.lg) {
                return 'pa-2 mx-8'
            } else if(this.$vuetify.breakpoint.md) {
                return 'pa-2 mx-1'
            } else if (this.$vuetify.breakpoint.sm) {
                return 'pa-2 mx-0'
            } else if (this.$vuetify.breakpoint.xs) {
                return 'pa-2 mx-0'
            }
        },
        profile() {
            return this.getProfile
        },
        watchReqUntilCompleted() {
            if (this.getStatusOfReq) {
                console.log('req competed')
                this.isCompleted = true
            }
            console.log('outside of req')
            return this.isCompleted
        },
        getProfileBanner() {
            if (this.watchReqUntilCompleted && this.hasError) {
                console.log('banner error')
                return this.bannerImageForError
            }
            console.log('good')
            return this.$axios.defaults.baseURL + this.profile.profileBannerUrl
        }
    },
    methods: {
        defaultBanner() {
            console.log('bad')
            if (this.isCompleted) {
                console.log('we fucked up')
                this.hasError = true
            }
        }
    }
}
</script>

<style scoped>


</style>