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

import { AuthenticationRequestJson } from '~/store/modules/chat/helper-classes/requestJson/authenticationrequestjson'
import { GetChatUsersRequestJson } from '~/store/modules/chat/helper-classes/requestJson/getchatusersrequestjson'
import { GetUserMessagesRequestJson } from '~/store/modules/chat/helper-classes/requestJson/getusermessagesrequestjson'
import { SendMessageRequestJson } from '~/store/modules/chat/helper-classes/requestJson/sendmessagerequestjson'

import { BaseHandler } from '~/store/modules/chat/helper-classes/handlers/basehandler'
import { AuthenticationResponseHandler } from '~/store/modules/chat/helper-classes/handlers/authenticationhandler'
import { GetUserChatResponseHandler } from '~/store/modules/chat/helper-classes/handlers/getuserchathandler'
import { GetUserMessageResponseHandler } from '~/store/modules/chat/helper-classes/handlers/getusermessageshandler'
import { RecieveMessageHandler } from '~/store/modules/chat/helper-classes/handlers/recievechathandler'

export default {
    data: function() {
        return {
            websocket: null,
            access_token: ""
        }
    },
    computed: {
        ...mapGetters('modules/chat/chatManager',['getWebSocket']),
    },
    created() {
        this.websocket = this.getWebSocket

        this.websocket.AddOnMessageHandler(new RecieveMessageHandler(this.onRecieveMessage))

        this.websocket.AddOnErrorHandler(new BaseHandler(this.onErrorWebSocket))
    },
    methods: {
        ...mapActions('modules/chat/chatManager', ['setWebSocket', 'pushMessageJsonToProfile', 'addProfile']),
        onErrorWebSocket(event) {
            console.log(event.data)
        },
        onRecieveMessage({ data }) {
            data = JSON.parse(data)

            let username = data.message._from.username
            let messageJson = data.message
            this.pushMessageJsonToProfile({username, messageJson})
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