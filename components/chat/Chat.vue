<template>
    <v-row justify="start" align="center" no-gutters class="fill-height chat-scroll">
        <v-col cols="12" xl="3" lg="3">
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
            websocket: null
        }
    },
    created() {
        let websocket = new HuddleChatWebSocket('ws://188.40.212.205:8000/ws/chat/had0007')

        websocket.AddOnMessageHandler(this.onMessageWebSocket)

        websocket.AddOnOpenHandler(this.onOpenWebSocket)

        websocket.AddOnErrorHandler(this.onErrorWebSocket)

        this.setWebSocket(websocket)

        this.websocket = websocket

        setTimeout(() => {this.websocket.Authenticate(
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE2MDc3NjQ3NzQsImlhdCI6MTYwNzc1NzU3NH0.8pWJCooAwsfHjg3DHlz8RW3UwGM-yb_spSv2T6du9Iw"
        )}, 2000)

        setTimeout(() => {this.websocket.GetChatUsers()}, 5000)
    },
    methods: {
        ...mapActions('modules/chat/chatManager', ['setWebSocket', 'pushMessageToProfile', 'addProfile']),
        sendMessage(message) {
            console.log(this.websocket);
            this.websocket.SendMessage(message);
        },
        onOpenWebSocket(event) {
            console.log(event.data)
        },
        onErrorWebSocket(event) {
            console.log(event.data)
        },
        onMessageWebSocket(event) {
            console.log(event.data)
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