<template>
    <v-container fluid class="pa-0">
        <ProfileBanner />
        <v-row>
            <v-col cols="12" lg="3" sm="12">
                <ProfileDescription/>
            </v-col>
            <v-col cols="12" lg="6" sm="12">
                <v-tabs style="border-radius:2px" class="mb-4" v-model="selectedTab">
                    <v-tab @click="switchToPosts" :key="1" >Posts</v-tab>
                    <v-tab @click="switchToComments" :key="2" >Comments</v-tab>
                    <v-tab @click="switchToLikes" :key="3" >Likes</v-tab>
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
            username: '',
            selectedTab: 0,
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
        this.username = this.$route.params.username
        console.log(this.$route)
        this.getProfileInfo(this.username)
        let query = this.$route.query.show
        this.switchToProperTab(query)
        console.log(this.$route.params.username)
    },
    mounted() {
        // let hash = this.$route.hash
        // setTimeout(() => {this.setHash(hash)}, 1)
    },
    methods: {
        ...mapActions('modules/profile/profileInfo', ['getProfileInfo']),
        ...mapActions('modules/profile/profilePosts', ['getProfilePosts']),
        ...mapActions('modules/profile/profileComments', ['getProfileComments']),
        switchToProperTab(query) {
            if (query) {
                if (query === 'comments') {
                    this.selectedTab = 1
                    this.switchToComments()
                    return
                } else if (query === 'likes') {
                    this.selectedTab = 2
                    this.switchToLikes()
                    return
                }
            } 
            this.switchToPosts()
        },
        switchToPosts() {
            this.getProfilePosts(this.username)
            this.comp = ProfilePosts
        },
        switchToComments() {
            this.getProfileComments(this.username)
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
        },
        setHash(hash) {
            if (hash) {
                setTimeout(() => {
                    location.href = hash
                },1)
            }
        }
    }
}
</script>

<style scoped>

</style>