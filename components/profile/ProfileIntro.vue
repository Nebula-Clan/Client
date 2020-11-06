<template>
    <v-container fluid class="pa-0">
        <ProfileBanner />
        <v-row>
            <v-col cols="12" lg="3" sm="12">
                <ProfileDescription/>
            </v-col>
            <v-col cols="12" lg="6" sm="12">
                <v-tabs style="border-radius:2px" class="mb-4">
                    <v-tab @click="switchToPosts">Posts</v-tab>
                    <v-tab @click="switchToComments">Comments</v-tab>
                    <v-tab @click="switchToLikes">Likes</v-tab>
                </v-tabs>
                <v-container class="ml-0 py-0" v-for="(object, index) in getComponentObjects" :key="index">
                    <component :is="comp" v-bind="componentArgs(index)"> </component>
                </v-container>
            </v-col>
            <v-col cols="12" lg="3" sm="12">
                <ProfileStatusChart :height="200" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import ProfileBanner from './ProfileBanner'
import ProfileDescription from './ProfileDescription'
import ProfilePosts from './ProfilePosts'
import ProfileComments from './ProfileComments'
import ProfileLikes from './ProfileLikes'

export default {
    data: () => {
        return {
            n:10,
            model: 0,
            comp: ProfilePosts,
            componentObjects: []
        }
    },
    computed: {
        ...mapGetters('modules/profile/profilePosts', ['getPosts']),
        ...mapGetters('modules/profile/profileComments', ['getComments']),
        ...mapGetters('modules/profile/profileLikes', ['getLikes']),
        getComponentObjects() {
            if (this.comp == ProfilePosts) {
                this.componentObjects = this.getPosts
            } else if (this.comp == ProfileComments) {
                this.componentObjects = this.getComments
            } else {
                this.componentObjects = this.getLikes
            }
            return this.componentObjects
        }
    },
    created() {
        this.getProfileInfo(this.$route.params.username)
        console.log(this.$route.params.username)
    },
    methods: {
        ...mapActions('modules/profile/profileInfo', ['getProfileInfo']),
        ...mapActions('modules/profile/profilePosts', ['getProfilePosts']),
        switchToPosts() {
            this.getProfilePosts(4)
            this.comp = ProfilePosts
        },
        switchToComments() {
            this.comp = ProfileComments
        },
        switchToLikes() {
            this.comp = ProfileLikes
        },
        componentArgs(index) {
            if (this.comp == ProfilePosts) {
                return {
                    post: this.getComponentObjectById(index)
                }
            } else if (this.comp == ProfileComments) {
                return {
                    comment: this.getComponentObjectById(index)
                }
            } else {
                return {
                    likedObj: this.getComponentObjectById(index)
                }
            }
        },
        getComponentObjectById(id) {
            return this.componentObjects[id]
        }
    }
}
</script>

<style scoped>

</style>