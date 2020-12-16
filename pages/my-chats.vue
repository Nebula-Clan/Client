<template>
    <v-app>
        <v-container fluid class="pa-0 fill-height">
            <!-- <Chat /> -->
            <LoadPage />
        </v-container>
    </v-app>
</template>

<script>
import Chat from '~/components/chat/Chat'
import LoadPage from '~/components/chat/LoadPage'

export default {
    layout: 'chat',
    components: {
        Chat
    }
}
</script>

<style scoped>

</style>