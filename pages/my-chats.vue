<template>
    <v-app>
        <v-container fluid class="pa-0">
            <Chat />
        </v-container>
    </v-app>
</template>

<script>
import Chat from '~/components/chat/Chat'
export default {
    layout: 'chat',
    components: {
        Chat
    }
}
</script>