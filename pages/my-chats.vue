<template>
    <v-app>
        <v-container fluid class="pa-0 fill-height">
            <LoadPage v-if="!isConnected" @connected="onConnected" />
            <Chat v-else />
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
    },
    data() {
        return {
            isConnected: false
        }
    },
    methods: {
        onConnected() {
            this.isConnected = true
        }
    }
}
</script>

<style scoped>

</style>