<template>
    <v-row justify="start" align="center" no-gutters class="fill-height chat-scroll">
        <v-col cols="12" xl="3" lg="3" class="fill-height">
            <UserLists />
        </v-col>
        <v-col cols="12" xl="9" lg="9" class="px-0 fill-height chat-scroll">
            <ChattingSection />
        </v-col>
    </v-row>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

import { HuddleChatWebSocket } from '~/store/modules/chat/helper-classes/websocket'
import UserLists from '~/components/chat/UserLists'
import ChattingSection from '~/components/chat/ChattingSection'

export default {
    data: function() {
        return {
            websocket: null,
            access_token: ""
        }
    },
    created() {
        let websocket = new HuddleChatWebSocket(`ws://188.40.212.205:8000/ws/chat/${this.$auth.user.username}`)

        websocket.AddOnMessageHandler(this.onMessageWebSocket)

        websocket.AddOnOpenHandler(this.onOpenWebSocket)

        websocket.AddOnErrorHandler(this.onErrorWebSocket)

        this.setWebSocket(websocket)

        this.websocket = websocket

        this.access_token = this.$auth.getToken('local').split(" ")[1]
    },
    methods: {
        ...mapActions('modules/chat/chatManager', ['setWebSocket', 'pushMessageToProfile', 'addProfile']),
        sendMessage(message) {
            console.log(this.websocket);
            this.websocket.SendMessage(message);
        },
        onOpenWebSocket(event) {
            console.log(event.data)
            this.websocket.Authenticate(this.access_token)
        },
        onErrorWebSocket(event) {
            console.log(event.data)
        },
        onMessageWebSocket({ data }) {
            data = JSON.parse(data)
            if (data.type === "chat.authenticate") {
                console.log(data)
            } else if (data.type == 'chat.message.recieve') {
                let username = data.message._from.username
                let messageJson = data.message
                this.pushMessageToProfile({username, messageJson})
            }
        },
        onCloseWebSocket(event) {
            console.log(event.data)
        }
    }
    
}
</script>

<style>

/* ::-webkit-scrollbar {
    width: 0px; 
    background: transparent; 
}
::-webkit-scrollbar-thumb {
    background: #FF0000;
} */
</style>