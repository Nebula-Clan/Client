<template>
    <v-container fluid>
        <v-row>
            <v-img :src="getProfileBannerImageURL" max-height="450" alt="shit">

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
                                    {{ getNumberOfPosts }}
                                </p>
                            </v-col>
                            <v-col cols="2" lg="1" sm="2" xs="2" :class="getPaddingAndMargin">
                                <p class="text-center mb-0 text--secondary">
                                    Following
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    {{ getNumberOfFollowing }}
                                </p>
                            </v-col>
                            <v-col cols="2" lg="1" sm="2" xs="2" :class="getPaddingAndMargin">
                                <p class="text-center mb-0 text--secondary">
                                    Followers
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    {{ getNumberOfFollowers }}
                                </p>
                            </v-col>
                            <v-col cols="2" lg="1" sm="2" xs="2" :class="getPaddingAndMargin">
                                <p class="text-center mb-0 text--secondary">
                                    Likes
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    {{ getNumberOfLikes }}
                                </p>
                            </v-col>
                            <v-col cols="2" lg="1" sm="2" xs="2" :class="getPaddingAndMargin">
                                <p class="text-center mb-0 text--secondary">
                                    Comments
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    {{ getNumberOfComments }}
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
    computed: {
        ...mapGetters('modules/profile/profileInfo',
         ['getNumberOfPosts', 'getNumberOfFollowing', 'getNumberOfFollowers', 'getNumberOfLikes', 'getNumberOfComments', 'getProfileBannerImage']),
        getProfileBannerImageURL() {
            console.log(this.$axios.defaults.baseURL + this.getProfileBannerImage)
            return this.$axios.defaults.baseURL + this.getProfileBannerImage
        },
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
        }
    }
}
</script>

<style scoped>


</style>