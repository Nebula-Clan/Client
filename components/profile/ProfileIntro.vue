<template>
    <v-container fluid class="pa-0">
        <ProfileBanner />
        <v-row>
            <v-col cols="3">
                <ProfileDescription />
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
import ProfileBanner from './ProfileBanner'
import ProfileDescription from './ProfileDescription'

export default {
    data: () => {
        return {

        }
    }
}
</script>

<style scoped>

</style>