<template>
    <v-content style="height:100vh" class="back">
      <v-container fluid pa-0 class="d-flex flex-column flex-grow-1 fill-parent-height">
        <v-row no-gutters class="flex-grow-0 flex-shrink-0">
          <v-col cols="12" style="position: relative;">
                <v-container class="pa-0">
                    <ProfileStatus :profile="profile" />
                </v-container>
            </v-col>
        </v-row>
        <v-row no-gutters class="top-row flex-grow-1 flex-shrink-1">
          <v-col cols="12" class="scrollable" style="overflow-x: hidden" ref="chatList">
            <v-row v-for="(message, idx) in getMessages" :key="idx">
                <v-col cols="12" class="d-inline-flex py-1">
                  <Message class="ml-3" 
                  :profile="profile"
                  :message="message" />
                </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row no-gutters class="flex-grow-0 flex-shrink-0">
          <v-col cols="12" style="position: relative;">
                <v-container class="pa-0">
                    <UserInput
                    :show-emoji="true"
                    :on-submit="s"
                    :suggestions="sug()"
                    :show-file="false"
                    :placeholder="'ssfsdf'"
                    :colors="colors"
                    @recMessage="recvMessage"
                    />
                </v-container>
            </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import UserInput from './UserInput/UserInput'
import Message from './Message/Message'
import ProfileStatus from './ProfileStatus'

import { AuthenticationRequestJson } from '~/store/modules/chat/helper-classes/requestJson/authenticationrequestjson'
import { GetChatUsersRequestJson } from '~/store/modules/chat/helper-classes/requestJson/getchatusersrequestjson'
import { GetUserMessagesRequestJson } from '~/store/modules/chat/helper-classes/requestJson/getusermessagesrequestjson'
import { SendMessageRequestJson } from '~/store/modules/chat/helper-classes/requestJson/sendmessagerequestjson'
import { Message as MessageClass } from '~/store/modules/chat/models/message'

import { BaseHandler } from '~/store/modules/chat/helper-classes/handlers/basehandler'
import { AuthenticationResponseHandler } from '~/store/modules/chat/helper-classes/handlers/authenticationhandler'
import { GetUserChatResponseHandler } from '~/store/modules/chat/helper-classes/handlers/getuserchathandler'
import { GetUserMessageResponseHandler } from '~/store/modules/chat/helper-classes/handlers/getusermessageshandler'
import { RecieveMessageHandler } from '~/store/modules/chat/helper-classes/handlers/recievechathandler'

export default {
    data() {
      return {
        username: undefined,
        last: -1,
        readyState: -1,
        profile: null,
        messages: [],
        participants: [
            {
            id: 'user1',
            name: 'Matteo',
            imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
            },
            {
            id: 'user2',
            name: 'Support',
            imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4'
            }
        ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
        titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
        messageList: [
            { type: 'text', author: `me`, data: { text: `Say yes!` } },
            { type: 'text', author: `user1`, data: { text: `No.` } }
        ], // the list of the messages to show, can be paginated and adjusted dynamically
        newMessagesCount: 0,
        isChatOpen: false, // to determine whether the chat window should be open or closed
        showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
        colors: {
            header: {
            bg: '#4e8cff',
            text: '#ffffff'
            },
            launcher: {
            bg: '#4e8cff'
            },
            messageList: {
            bg: '#ffffff'
            },
            sentMessage: {
            bg: '#4e8cff',
            text: '#ffffff'
            },
            receivedMessage: {
            bg: '#eaeaea',
            text: '#222222'
            },
            userInput: {
            bg: '#f4f7f9',
            text: '#565867'
            }
        }, // specifies the color scheme for the component
        alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
        messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
        }
      },
  computed: {
    ...mapGetters('modules/chat/chatManager',['getWebSocket']),
    getMessages() {
      console.log('hallo')
      if (this.profile != undefined) {
          this.scrollToBottom()
          return this.profile.messageList
      }

      return []
    }
  },
  created() {
    this.$nuxt.$on('loadProfileChats', this.onLoadProfileChatsHandler)
    let oid = 5
    let uid = 3
    let last = 3
    for (let i = 0; i < 40; i++) {
      let user = this.shit() > 3 ? true : false;
      this.messages.push({
        'isUser': user,
        'previousId': last,
        'currentId' : user ? 3 : 5,
        'isSeen': true,
        'message': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perspiciatis enim similique aspernatur alias dolor tempora voluptatum repudiandae fuga delectus nemo error officiis molestiae saepe sunt mollitia, ipsa laboriosam quam esse ipsum ratione voluptates unde eos libero! Voluptate illum aperiam rem assumenda neque, dolorem enim quae ipsam cumque velit modi?'
        })
        last = user ? 3 : 5
    }
    this.last = last
  },
  mounted() {
    this.getWebSocket.AddOnOpenHandler(new BaseHandler(this.onOpenHandler))
    this.getWebSocket.AddOnMessageHandler(new GetUserMessageResponseHandler(this.onMessageHandler))

    this.readyState = this.getWebSocket.readyState
  },
  methods: {
    ...mapActions('modules/chat/chatManager', ['pushMessageJsonToProfile', 'pushMessageToProfile', 'getProfileByUsername', 'sortProfileMessages']),
    onLoadProfileChatsHandler(profileUsername) {
      this.username = profileUsername
      this.getProfileByUsername(this.username).then((profile) => {this.profile = profile})
      this.obtainMessages()
    },
    onOpenHandler({ data }) {
      this.obtainMessages()
    },
    onMessageHandler({ data }) {
      data = JSON.parse(data)
      
      console.log(data)
      data.data = JSON.parse(data.data)
      let username = this.username
      let messageJson = data.data
      let isArray = Array.isArray(messageJson)
      this.pushMessageJsonToProfile({username, messageJson, isArray}).then(() => this.scrollToBottom())
      console.log(isArray)
      if (isArray) {
        this.sortProfileMessages(username)
      }
    },
    obtainMessages() {
      console.log(this.getWebSocket)
      console.log(this.username)
      if (this.getWebSocket.readyState == 1 && this.username != undefined) {
        let getUserMessageReq = new GetUserMessagesRequestJson(this.username)
        this.getWebSocket.SendRequest(getUserMessageReq)
      }
    },
    recvMessage(text) {
      let sendMessageReq = new SendMessageRequestJson(text, this.username)
      this.getWebSocket.SendRequest(sendMessageReq)

      let username = this.username
      let messageInstance = new MessageClass()
      let isArray = false

      messageInstance.messageDate = new Date()
      messageInstance.messageBody = text
      messageInstance.isSeen = false
      messageInstance.isSender = true

      this.pushMessageToProfile({username, messageInstance, isArray})
      this.scrollToBottom()
    },
    scrollToBottom() {
      this.$nextTick(() => {
        let chatList = this.$refs.chatList
        chatList.scrollTop = chatList.scrollHeight;
      })
    },
    getCurrentId() {

    },
    s() {
        console.log('submit')
    },
    sug() {
        console.log('sug')
        return []
    },
    shit() {
        let s = Math.floor((Math.random() * 10) + 1) % 7
        return s
    }
  }
}
</script>

<style scoped>
.grid-item-blue {
  background-color: lightblue;
}

.grid-item-green {
  background-color: lightgreen;
  overflow-y: scroll;
}

.grid-item-pink {
  background-color: pink;
  height: 100px;
}
.grid-item-green>p{
	height:9000px;
	border:10px solid;
	margin:20px;
}

.fill-parent-height {
  height: 100%;
}

.top-row{
	min-height: 0;
}

.back {
  background-color:#212226;
}

.scrollable {
    overflow-y: auto;
    height: 100%;
  }

.tab-stick {
    top: 0px;
    position: sticky;
    position: -webkit-sticky;
    z-index: 5;
}

.avatar {

}

::-webkit-scrollbar {
    width: 4px;
    height: 10px;

}
::-webkit-scrollbar-thumb {
border-radius: 8px;
background: #c2c9d2;
}
</style>