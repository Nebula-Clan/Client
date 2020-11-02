<template>
    <v-app>
        <v-container fluid>
            <v-row justify="start" align="center">
                <ProfileIntro />
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import ProfileIntro from '~/components/profile/ProfileIntro'
export default {
    components: {
        ProfileIntro
    }
}
</script>
