<template>
    <v-content style="height:100vh" class="back">
      <v-container fluid pa-0 class="d-flex flex-column flex-grow-1 fill-parent-height">
        <v-row no-gutters class="flex-grow-0 flex-shrink-0">
          <v-col cols="12" style="position: relative;">
                <v-container class="pa-0">
                    <ProfileStatus v-if="hasUsername" :profile="profile" />
                </v-container>
            </v-col>
        </v-row>
        <v-row no-gutters class="top-row flex-grow-1 flex-shrink-1">
          <v-col cols="12" class="scrollable" style="overflow-x: hidden" ref="chatList">
            <v-row v-for="(message, idx) in getMessages" :key="idx">
                <v-col cols="12" class="d-inline-flex py-1">
                  <Message class="ml-3" 
                  :profile="profile"
                  :message="message"
                  :previousId="getPrev(idx)"
                  :currentId="getCur(idx)"
                  :observer="observer" />
                </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row no-gutters class="flex-grow-0 flex-shrink-0">
          <v-col cols="12" style="position: relative;">
                <v-container class="pa-0">
                    <UserInput
                    v-if="hasUsername"
                    :show-emoji="true"
                    :suggestions="sug()"
                    :show-file="false"
                    @recMessage="recvMessage"
                    @typing="typing"
                    @stopTyping="stop"
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
import { ControlMessageRequestJson } from '~/store/modules/chat/helper-classes/requestJson/controlmessagerequestjson'
import { SeenMessageRequestJson } from '~/store/modules/chat/helper-classes/requestJson/seenmessagerequestjson'
import { GetChatUsersRequestJson } from '~/store/modules/chat/helper-classes/requestJson/getchatusersrequestjson'
import { GetUserMessagesRequestJson } from '~/store/modules/chat/helper-classes/requestJson/getusermessagesrequestjson'
import { SendMessageRequestJson } from '~/store/modules/chat/helper-classes/requestJson/sendmessagerequestjson'
import { Message as MessageClass } from '~/store/modules/chat/models/message'

import { BaseHandler } from '~/store/modules/chat/helper-classes/handlers/basehandler'
import { ControlMessageHandler } from '~/store/modules/chat/helper-classes/handlers/controlmessagehandler'
import { SeenMessageHandler } from '~/store/modules/chat/helper-classes/handlers/seenmessagehandler'
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
        observer: null,
        hasUsername: false
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

    this.observer = new IntersectionObserver(
      this.onMessageSeen, 
      {
        root: this.$el,
        threshold: 1.0,
      }
    );
  },
  mounted() {
    this.getWebSocket.AddOnOpenHandler(new BaseHandler(this.onOpenHandler))
    this.getWebSocket.AddOnMessageHandler(new GetUserMessageResponseHandler(this.onMessageHandler))
    this.getWebSocket.AddOnMessageHandler(new SeenMessageHandler(this.onSeenMessage))
  },
  updated() {
    if ((this.username === undefined || this.username === null) && this.hasUsername) {
      this.hasUsername = false
    } else {
      this.hasUsername = true
    }
  },
  methods: {
    ...mapActions('modules/chat/chatManager', ['pushMessageJsonToProfile', 'pushMessageToProfile',
     'getProfileByUsername', 'sortProfileMessages', 'swapProfileToFront', 'addUnseenToProfile',
      'setObtainMessageStatus', 'setProfileLastMessage']),
    onLoadProfileChatsHandler(profileUsername) {
      this.username = profileUsername
      this.getProfileByUsername(this.username).then((profile) => {
        this.profile = profile
        this.obtainMessages()
      })
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
      if (this.profile && this.profile.isObtained) {
        return
      }

      if (this.username != undefined) {
        let getUserMessageReq = new GetUserMessagesRequestJson(this.username, this.profile.numberOfMessage)
        this.getWebSocket.SendRequest(getUserMessageReq)

        let username = this.username
        let obtainStatus = true
        this.setObtainMessageStatus({username, obtainStatus})
      }
    },
    recvMessage(text) {
      console.log(text)
      if (text == undefined || text == null || text.length == 0) {
        return
      }
      console.log(text.length)
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
      this.swapProfileToFront(username)
      this.setProfileLastMessage({
          username: username,
          lastMessage: messageInstance,
          isJson: false
      })
      this.scrollToBottom()
    },
    onSeenMessage({ data }) {
      data = JSON.parse(data)
      console.log(data)

      let messageID = data.id

    },
    seenMessage(messageID) {
      let seenMessage = new SeenMessageRequestJson(messageID)
      this.getWebSocket.SendRequest(seenMessage)
    },
    onMessageSeen(entries) {
      entries.forEach(({ target, isIntersecting}) => {
          if (!isIntersecting) {
            return;
          }

          let unseenCount = -1
          let username = this.username
          this.addUnseenToProfile({username, unseenCount})
        
          this.observer.unobserve(target);
        
          setTimeout(() => {
            let messageID = target.getAttribute("message-id");
            this.seenMessage(messageID)
          }, 1000)
      });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        let chatList = this.$refs.chatList
        chatList.scrollTop = chatList.scrollHeight;
      })
    },
    getPrev(index) {
      if (index === 0) {
        return -1
      }
      if (this.profile.messageList[index - 1].isSender) {
        return 1
      }
      return 0
    },
    getCur(index) {
      if (this.profile.messageList[index].isSender) {
        return 1
      }
      return 0
    },
    typing() {
      let typingMessage = new ControlMessageRequestJson(this.profile.username, {
        type: "status",
        status: "typing"
      })
      this.getWebSocket.SendRequest(typingMessage)
      console.log('submit')
    },
    stop() {
      let typingMessage = new ControlMessageRequestJson(this.profile.username, {
        type: "status",
        status: "online"
      })
      this.getWebSocket.SendRequest(typingMessage)
      console.log('stop')
    },
    sug() {
        console.log('sug')
        return []
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