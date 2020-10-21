<template>
    <v-container fluid class="pa-0">
        <ProfileBanner />
        <v-row>
            <v-col cols="3">
                <ProfileDescription />
            </v-col>
            <v-col cols="6">
                <v-tabs style="border-radius:2px">
                    <v-tab>Posts</v-tab>
                    <v-tab>Comments</v-tab>
                    <v-tab>Likes</v-tab>
                </v-tabs>
                <v-container class="ml-0" v-for="i in n" :key="i">
                    <ProfileComments />
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ProfileBanner from './ProfileBanner'
import ProfileDescription from './ProfileDescription'
import ProfileComments from './ProfileComments'

export default {
    data: () => {
        return {
            n:10
        }
    }
}
</script>

<style scoped>

</style>