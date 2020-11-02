<template>
    <v-container fluid>
        <v-row>
            <v-img :src="getProfileBannerImageURL" max-height="450">

            </v-img> 
        </v-row>
        <v-row>
            <v-container fluid class="pa-0">
                <div style="background-color:#12232E">
                    <v-container class="pa-0">
                        <v-row justify="center" align="center">
                            <v-col cols="2" lg="2" sm="2" xs="2" class="pa-2">
                                <p class="text-center mb-0 text--secondary">
                                    Posts
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    {{ getNumberOfPosts }}
                                </p>
                            </v-col>
                            <v-col cols="2" lg="2" sm="2" xs="2" class="pa-2">
                                <p class="text-center mb-0 text--secondary">
                                    Following
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    {{ getNumberOfFollowing }}
                                </p>
                            </v-col>
                            <v-col cols="2" lg="2" sm="2" xs="2" class="pa-2">
                                <p class="text-center mb-0 text--secondary">
                                    Followers
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    {{ getNumberOfFollowers }}
                                </p>
                            </v-col>
                            <v-col cols="2" lg="2" sm="2" xs="2" class="pa-2">
                                <p class="text-center mb-0 text--secondary">
                                    Likes
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    {{ getNumberOfLikes }}
                                </p>
                            </v-col>
                            <v-col cols="2" lg="2" sm="2" xs="2" class="pa-2">
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
        }
    }
}
</script>

<style scoped>


</style>