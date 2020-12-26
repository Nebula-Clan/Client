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
import { GetProfileInfoRequestJson } from '~/store/modules/chat/helper-classes/requestJson/getprofileinforequestjson'
import { GetUserMessagesRequestJson } from '~/store/modules/chat/helper-classes/requestJson/getusermessagesrequestjson'
import { SendMessageRequestJson } from '~/store/modules/chat/helper-classes/requestJson/sendmessagerequestjson'

import { BaseHandler } from '~/store/modules/chat/helper-classes/handlers/basehandler'
import { ControlMessageHandler } from '~/store/modules/chat/helper-classes/handlers/controlmessagehandler'
import { AuthenticationResponseHandler } from '~/store/modules/chat/helper-classes/handlers/authenticationhandler'
import { GetProfileInfoResponseHandler } from '~/store/modules/chat/helper-classes/handlers/getprofileinfohandler'
import { GetUserChatResponseHandler } from '~/store/modules/chat/helper-classes/handlers/getuserchathandler'
import { GetUserMessageResponseHandler } from '~/store/modules/chat/helper-classes/handlers/getusermessageshandler'
import { RecieveMessageHandler } from '~/store/modules/chat/helper-classes/handlers/recievechathandler'
import { ControlMessageRequestJson } from '~/store/modules/chat/helper-classes/requestJson/controlmessagerequestjson'

import { ChatProfile } from '~/store/modules/chat/models/chatprofile'
import { forEach } from 'async'

export default {
    data: function() {
        return {
            websocket: null,
            access_token: "",
            waiting_users: new Map()
        }
    },
    computed: {
        ...mapGetters('modules/chat/chatManager',['getWebSocket', 'getUserListController', 'getSearchListController']),
    },
    created() {
        this.websocket = this.getWebSocket

        this.websocket.AddOnMessageHandler(new RecieveMessageHandler(this.onRecieveMessage))
        this.websocket.AddOnMessageHandler(new ControlMessageHandler(this.onStatusHandler))
        this.websocket.AddOnMessageHandler(new BaseHandler(this.printData))
        this.websocket.AddOnMessageHandler(new GetUserMessageResponseHandler(this.onGetAllUserMessage))
        this.websocket.AddOnMessageHandler(new GetProfileInfoResponseHandler(this.onGetNewProfileInfo))

        this.websocket.AddOnErrorHandler(new BaseHandler(this.onErrorWebSocket))
        this.websocket.AddOnCloseHandler(new BaseHandler(this.onClose))
    },
    methods: {
        ...mapActions('modules/chat/chatManager', ['setWebSocket', 'pushMessageJsonToProfile',
         'addProfileToUserList', 'swapProfileToFront', 'setProfileStatus', 'addUnseenToProfile',
         'setProfileLastMessage', 'sortProfileMessages', 'setObtainMessageStatus',
          'transferProfileFromSearchListToUserList', 'addProfileInstanceToUserList']),
        onErrorWebSocket(event) {
            console.log(event)
        },
        printData(event) {
            console.log(event)
        },
        onClose(event) {
            console.log(event)
        },
        onRecieveMessage({ data }) {
            data = JSON.parse(data)

            let username = data._from.username
            let messageJson = data.message
            let unseenCount = 1
            console.log(messageJson)

            if (this.getUserListController.hasProfile(username)) {
                this.addMessageToProfile(username, messageJson, unseenCount)
            } else if (this.getSearchListController.hasProfile(username)) {
                this.transferProfileFromSearchListToUserList(username).then((status) => {
                    if (status) {
                        this.addMessageToProfile(username, messageJson, unseenCount)
                    }
                })
            } else {
                if (!this.waiting_users.has(username)) {
                    this.waiting_users.set(username, [])
                }
                this.waiting_users.get(username).push({username, messageJson, unseenCount})
                this.websocket.SendRequest(new GetProfileInfoRequestJson(username))
            }
        },
        onStatusHandler({ data }) {
            data = JSON.parse(data)
            // console.log(data)

            let fromUsername = data.from
            let statusData = data.data

            if (statusData.type === "status") {
                if (statusData.status === "typing") {
                    this.setProfileStatus({
                        username: fromUsername,
                        status: statusData.status
                    })
                } else {
                    this.setProfileStatus({
                        username: fromUsername,
                        status: statusData.status
                    })
                }
            }

        },
        onCloseWebSocket(event) {
            console.log(event.data)
        },
        onGetAllUserMessage({ data }) {
            data = JSON.parse(data)
            console.log(data)

            data.data = JSON.parse(data.data)
            let messageJson = data.data
            let isArray = Array.isArray(messageJson)
            let for_username = data._user.username
            console.log(for_username)

            this.pushMessageJsonToProfile({
                username: for_username, 
                messageJson: messageJson,
                isArray: isArray})
            .then((status) => {
                if (isArray) {
                    this.sortProfileMessages(for_username)
                }

                let obtainStatus = true
                this.setObtainMessageStatus({
                    username: for_username,
                    obtainStatus: obtainStatus})
            })
        },
        addMessageToProfile(username, messageJson, unseenCount) {
            this.pushMessageJsonToProfile({username, messageJson})
            this.swapProfileToFront(username)
            this.addUnseenToProfile({username, unseenCount})
            this.setProfileLastMessage({
                username: username,
                lastMessage: messageJson,
                isJson: true
            })
        },
        onGetNewProfileInfo({ data }) {
            data = JSON.parse(data)

            let chatprofile = new ChatProfile()

            chatprofile.parseProfileFromJson(data.user)

            console.log(chatprofile)

            if (!this.waiting_users.has(chatprofile.username)) {
                return
            }

            console.log('hello')

            this.addProfileInstanceToUserList(chatprofile)
            .then((status) => {
                if (status) {
                    console.log('okeye')
                    let waiting_messages = this.waiting_users.get(chatprofile.username)

                    waiting_messages.forEach((message) => {
                        this.addMessageToProfile(message.username, message.messageJson, message.unseenCount)
                    })

                    this.waiting_users.delete(chatprofile.username)
                }
            })
        },
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