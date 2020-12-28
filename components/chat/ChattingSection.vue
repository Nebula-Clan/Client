<template>
    <v-content style="height:100vh" class="back">
      <v-overlay :value="!isLoaded" :absolute="true">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
      <v-container fluid pa-0 class="d-flex flex-column flex-grow-1 fill-parent-height" ref="profileStatus">
        <v-row no-gutters class="flex-grow-0 flex-shrink-0">
          <v-col cols="12" style="position: relative;">
                <v-container class="pa-0">
                    <ProfileStatus v-if="hasUsername" :profile="profile" />
                </v-container>
            </v-col>
        </v-row>
        <v-row no-gutters class="top-row flex-grow-1 flex-shrink-1">
          <v-col cols="12" class="scrollable" style="overflow-x: hidden" ref="chatList" v-on:scroll.passive="handleScroller">
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
                    :show-file="false"
                    @sendTextMessage="sendMessage"
                    @sendFileMessage="sendFile"
                    @sendVoiceMessage="sendVoice"
                    @typing="typing"
                    @stopTyping="onlineStatus"
                    @recording="recordingVoiceStatus"
                    />
                </v-container>
            </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { v4 as uuidv4 } from 'uuid';

import UserInput from './UserInput/UserInput'
import Message from './Message/Message'
import ProfileStatus from './ProfileStatus'

import { AuthenticationRequestJson } from '~/store/modules/chat/helper-classes/requestJson/authenticationrequestjson'
import { ControlMessageRequestJson } from '~/store/modules/chat/helper-classes/requestJson/controlmessagerequestjson'
import { SeenMessageRequestJson } from '~/store/modules/chat/helper-classes/requestJson/seenmessagerequestjson'
import { GetProfileInfoRequestJson } from '~/store/modules/chat/helper-classes/requestJson/getprofileinforequestjson'
import { GetChatUsersRequestJson } from '~/store/modules/chat/helper-classes/requestJson/getchatusersrequestjson'
import { GetUserMessagesRequestJson } from '~/store/modules/chat/helper-classes/requestJson/getusermessagesrequestjson'
import { SendMessageRequestJson } from '~/store/modules/chat/helper-classes/requestJson/sendmessagerequestjson'
import { Message as MessageClass } from '~/store/modules/chat/models/message'
import { FileMessage } from '~/store/modules/chat/models/filemessage'

import { BaseHandler } from '~/store/modules/chat/helper-classes/handlers/basehandler'
import { ControlMessageHandler } from '~/store/modules/chat/helper-classes/handlers/controlmessagehandler'
import { SeenMessageHandler } from '~/store/modules/chat/helper-classes/handlers/seenmessagehandler'
import { GetProfileInfoResponseHandler } from '~/store/modules/chat/helper-classes/handlers/getprofileinfohandler'
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
        hasUsername: false,
        isLoaded: true,
        canScrollOnMessage: true,
        isFromSearch: false
      }
    },
    watch: {
      'profile.messageList' : {
        handler: function(val, oldval) {
          this.tryToScroll()
        }
      }
    },
  computed: {
    ...mapGetters('modules/chat/chatManager',['getWebSocket', 'getUserListController', 'getSearchListController']),
    getMessages() {
      if (this.profile != undefined) {
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
    this.getWebSocket.AddOnMessageHandler(new SeenMessageHandler(this.onSeenMessage))
    this.getWebSocket.AddOnMessageHandler(new GetProfileInfoResponseHandler(this.onGetNewProfileInfo))
  },
  updated() {
    if ((this.username === undefined || this.username === null) && this.hasUsername) {
      this.hasUsername = false
    } else {
      this.hasUsername = true
    }
  },
  methods: {
    ...mapActions('modules/chat/uploadFile', ['uploadMessageWithFile']),
    ...mapActions('modules/chat/chatManager', ['pushMessageJsonToProfile', 'pushMessageToProfile',
     'getProfileByUsername', 'sortProfileMessages', 'swapProfileToFront', 'addUnseenToProfile',
      'setObtainMessageStatus', 'setProfileLastMessage', 'seenProfileMessageWithID',
        'getProfileFromSearchList', 'addProfileToSearchList', 'getProfileFromSearchListWithUsername',
          'transferProfileFromSearchListToUserList']),
    onLoadProfileChatsHandler(profileUsername) {
      this.username = profileUsername
      this.clearPage()
      
      if (this.getUserListController.hasProfile(this.username)) {
        this.getProfileByUsername(this.username).then((profile) => {
          this.loadProfileAndObtainMessage(profile)
        })
      } else if (this.getSearchListController.hasProfile(this.username)) {
        this.getProfileFromSearchList({
            username: this.username,
            transferToUserList: false
          }).then((profile) => {
            this.isFromSearch = true
            this.loadProfileAndObtainMessage(profile)
        })
      } else {
        this.getWebSocket.SendRequest(new GetProfileInfoRequestJson(this.username))
      }
    },
    loadProfileAndObtainMessage(profile) {
      this.isLoaded = true
      this.profile = profile
      if (!this.isFromSearch) {
        this.obtainMessages()
      }
    },
    obtainMessages() {
      console.log(this.getWebSocket)
      console.log(this.profile)
      if (this.profile && this.profile.isObtainedMessages) {
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
    sendMessage(text) {
      if (text == undefined || text == null || text.length == 0) {
        return
      }
      if (this.isFromSearch) {

      }

      let username = this.username
      let messageInstance = this.createMessageInstance()
      messageInstance.messageBody = text
      let isArray = false

      console.log(messageInstance)

      let sendMessageReq = new SendMessageRequestJson(text, username, messageInstance.messageUUID)
      this.getWebSocket.SendRequest(sendMessageReq)

      this.addMessageToProfile(username, messageInstance, isArray)
    },
    onGetNewProfileInfo({ data }) {
      data = JSON.parse(data)

      this.addProfileToSearchList(data.user)
      .then((status) => {
        if (status) {
          this.getProfileFromSearchListWithUsername(this.username)
          .then((profile) => {
            this.isFromSearch = true
            console.log(profile)
            if (profile !== null && profile !== undefined && profile.username == this.username) {
              this.loadProfileAndObtainMessage(profile)
            }
          })
        }
      })
    },
    sendFile(file) {
      let fileMessage = this.createMessageInstance(true)
      if (file.type.includes('image')) {
        fileMessage.messageType = 1
      } else {
        fileMessage.messageType = 3
      }
      fileMessage.fileName = file.name

      this.sendingFileStatus()
      this.uploadFileMessage(fileMessage, file)
    },
    sendVoice(audioBlob) {
      let voiceMessage = this.createMessageInstance(true)
      voiceMessage.messageType = 2
      voiceMessage.fileName = 'Voice message'

      this.sendingVoiceStatus()
      this.uploadFileMessage(voiceMessage, audioBlob)
    },
    uploadFileMessage(messageInstance, file) {
      this.uploadMessageWithFile({
        toUsername: this.username,
        messageInstance: messageInstance,
        file: file }).then((fileUrl) => {
          console.log(fileUrl)
          messageInstance.messageBody = fileUrl
          messageInstance.fileUrl = fileUrl
          console.log(messageInstance)
          this.addMessageToProfile(this.username, messageInstance, false)
          this.onlineStatus()
        })
    },
    onSeenMessage({ data }) {
      data = JSON.parse(data)
      console.log(data)

      let messageUUID = data.uuid
      let username = data.user.username

      this.seenProfileMessageWithID({
        username: username, 
        messageIdentifier: messageUUID,
        isMessageUUID: true
        }).then((status) => {
        console.log(status)
      })
    },
    seenMessage(messageID) {
      this.seenProfileMessageWithID({
        username: this.username, 
        messageIdentifier: messageID,
        isMessageUUID: false}).then((status) => {
          console.log(status)
        if (status) {
          let unseenCount = -1
          let username = this.username
          this.addUnseenToProfile({username, unseenCount})
        }
      })
      let seenMessage = new SeenMessageRequestJson(messageID)
      this.getWebSocket.SendRequest(seenMessage)
    },
    onMessageSeen(entries) {
      entries.forEach(({ target, isIntersecting}) => {
          if (!isIntersecting) {
            return;
          }

          console.log('h3')
        
          this.observer.unobserve(target);
        
          setTimeout(() => {
            let messageID = target.getAttribute("message-id");
            this.seenMessage(messageID)
          }, 300)
      });
    },
    clearPage() {
      this.profile = null
      this.isLoaded = false
      this.isFromSearch = false
      this.canScrollOnMessage = true
    },
    tryToScroll() {
      if (this.canScrollOnMessage) {
        this.scrollToBottom()
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        let chatList = this.$refs.chatList
        chatList.scrollTop = chatList.scrollHeight;
      })
    },
    createMessageInstance(isFile) {
      let messageInstance = new MessageClass()
      if (isFile) {
        messageInstance = new FileMessage()
      }

      messageInstance.messageDate = new Date()
      messageInstance.isSeen = false
      messageInstance.isSender = true
      messageInstance.messageUUID = uuidv4()

      return messageInstance
    },
    addMessageToProfile(username, messageInstance, isArray) {
      if (this.isFromSearch) {
        this.transferProfileFromSearchListToUserList({
          username: username
          }).then((status) => {
          if (status) {
            this.isFromSearch = false
            this.pushMessageAndScroll(username, messageInstance, isArray)
          }
        })
      } else {
        this.pushMessageAndScroll(username, messageInstance, isArray)
      }
    },
    pushMessageAndScroll(username, messageInstance, isArray) {
      this.pushMessageToProfile({username, messageInstance, isArray}).then(() => this.scrollToBottom())
      this.swapProfileToFront(username)
      this.setProfileLastMessage({
          username: username,
          lastMessage: messageInstance,
          isJson: false
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
    sendingFileStatus() {
      this.sendStatus("sending file")
    },
    sendingVoiceStatus() {
      this.sendStatus("sending voice")
    },
    recordingVoiceStatus() {
      this.sendStatus("recording voice")
    },
    typing() {
      this.sendStatus("typing")
    },
    sendStatus(statusText) {
      let typingMessage = new ControlMessageRequestJson(this.profile.username, {
        type: "status",
        status: statusText
      })
      this.getWebSocket.SendRequest(typingMessage)
      console.log(statusText)
    },
    onlineStatus() {
      let typingMessage = new ControlMessageRequestJson(this.profile.username, {
        type: "status",
        status: "online"
      })
      this.getWebSocket.SendRequest(typingMessage)
      console.log('stop')
    },
    handleScroller(event) {
      if (event.target.scrollTop >= (event.target.scrollHeight - this.$refs.profileStatus.clientHeight)) {
        this.canScrollOnMessage = true
      } else {
        this.canScrollOnMessage = false
      }
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