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
                <v-container class="ml-0 py-0" v-for="i in n" :key="i">
                    <component :is="comp" v-bind="componentArgs"> </component>
                </v-container>
            </v-col>
            <v-col cols="12" lg="3" sm="12">
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
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
            comp: ProfilePosts
        }
    },
    computed: {
        componentArgs() {
            if (this.comp == ProfilePosts) {
                return {
                    liked: false
                }
            } else if (this.comp == ProfileComments) {
                return {
                    liked: false
                }
            }
        }
    },
    methods: {
        switchToPosts() {
            this.comp = ProfilePosts
        },
        switchToComments() {
            this.comp = ProfileComments
        },
        switchToLikes() {
            this.comp = ProfileLikes
        }
    }
}
</script>

<style scoped>

</style>