<template>
    <v-container fill-height>
        <div class="cube">
            <div class="sides">
                <div class="top"></div>
                <div class="right"></div>
                <div class="bottom"></div>
                <div class="left"></div>
                <div class="front"></div>
                <div class="back"></div>
            </div>
        </div>
        <div class="text">{{ getWaitText }}</div>
    </v-container>
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
            access_token: "",
            redirect: false,
            numberOfSeconds: 5,
            interval: null
        }
    },
    computed: {
        getWaitText() {
            if (this.redirect) {
                return `Please login,we are redirecting you to login page in ${this.numberOfSeconds}s...`
            }
            return 'Please wait, we are trying to connect you to Huddle\'s servers...'
        }
    },
    created() {
        if (this.$auth.user !== null && this.$auth.user !== undefined && this.$auth.user.username !== '') {
            let websocket = new HuddleChatWebSocket(`ws://172.245.10.238:8000/ws/chat/${this.$auth.user.username}`)

            websocket.AddOnMessageHandler(new AuthenticationResponseHandler(this.onAuthenticate))

            websocket.AddOnOpenHandler(new BaseHandler(this.onOpenWebSocket))

            websocket.AddOnErrorHandler(new BaseHandler(this.onErrorWebSocket))

            this.setWebSocket(websocket)

            this.websocket = websocket

            this.access_token = this.$auth.getToken('local').split(" ")[1]
        } else {
            this.redirect = true
            this.countDownToRedirect()
        }
    },
    methods: {
        ...mapActions('modules/chat/chatManager', ['setWebSocket', 'pushMessageJsonToProfile', 'addProfileToUserList']),
        onAuthenticate({ data }) {
            data = JSON.parse(data)
            console.log(data)

            this.$emit('connected')
        },
        onOpenWebSocket(event) {
            console.log(event.data)
            let authReq = new AuthenticationRequestJson(this.access_token)
            this.websocket.SendRequest(authReq)
        },
        onErrorWebSocket({ data }) {
            console.log(data)
        },
        countDownToRedirect() {
            this.interval = setInterval(() => {
                this.numberOfSeconds--
                if (this.numberOfSeconds <= 0) {
                    clearInterval(this.interval)
                    this.$router.push('/login')
                }
            }, 1000)
        }
    }
}
</script>



<style scoped>
body {
color: #fff;
font-family: 'Inter', sans-serif;
background: #151515;
}

.container {
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
}

.text {
margin-top: 22rem;
font-size: 1rem;
width: 100%;
font-weight: 200;
text-align: center;
}

.cube,
.cube * {
position: absolute;
width: 6rem;
height: 6rem;
}
.cube .sides * {
box-sizing: border-box;
border: 0.12rem solid white;
border-radius: 0.25rem;
background: rgba(255, 255, 255, 0.1);
}

@keyframes rotate {
0% {
    transform: rotateX(-37.5deg) rotateY(45deg);
}
50% {
    transform: rotateX(-37.5deg) rotateY(405deg);
}
100% {
    transform: rotateX(-37.5deg) rotateY(405deg);
}
}

.sides {
animation: rotate 3s ease infinite;
animation-delay: 0.8s;
transform-style: preserve-3d;
transform: rotateX(-37.5deg) rotateY(45deg);
}

.cube .sides .top {
animation: top-animation 3s ease infinite;
animation-delay: 0ms;
transform: rotateX(90deg) translateZ(96px);
animation-fill-mode: forwards;
transform-origin: 50% 50%;
}

@keyframes top-animation {
0% {
    opacity: 1;
    transform: rotateX(90deg) translateZ(100px);
}
20% {
    opacity: 1;
    transform: rotateX(90deg) translateZ(48px);
}
70% {
    opacity: 1;
    transform: rotateX(90deg) translateZ(48px);
}
90% {
    opacity: 1;
    transform: rotateX(90deg) translateZ(100px);
}
100% {
    opacity: 1;
    transform: rotateX(90deg) translateZ(100px);
}
}
.cube .sides .bottom {
animation: bottom-animation 3s ease infinite;
animation-delay: 0ms;
transform: rotateX(-90deg) translateZ(96px);
animation-fill-mode: forwards;
transform-origin: 50% 50%;
}

@keyframes bottom-animation {
0% {
    opacity: 1;
    transform: rotateX(-90deg) translateZ(100px);
}
20% {
    opacity: 1;
    transform: rotateX(-90deg) translateZ(48px);
}
70% {
    opacity: 1;
    transform: rotateX(-90deg) translateZ(48px);
}
90% {
    opacity: 1;
    transform: rotateX(-90deg) translateZ(100px);
}
100% {
    opacity: 1;
    transform: rotateX(-90deg) translateZ(100px);
}
}
.cube .sides .front {
animation: front-animation 3s ease infinite;
animation-delay: 100ms;
transform: rotateY(0deg) translateZ(96px);
animation-fill-mode: forwards;
transform-origin: 50% 50%;
}

@keyframes front-animation {
0% {
    opacity: 1;
    transform: rotateY(0deg) translateZ(96px);
}
20% {
    opacity: 1;
    transform: rotateY(0deg) translateZ(48px);
}
70% {
    opacity: 1;
    transform: rotateY(0deg) translateZ(48px);
}
90% {
    opacity: 1;
    transform: rotateY(0deg) translateZ(96px);
}
100% {
    opacity: 1;
    transform: rotateY(0deg) translateZ(96px);
}
}
.cube .sides .back {
animation: back-animation 3s ease infinite;
animation-delay: 100ms;
transform: rotateY(-180deg) translateZ(96px);
animation-fill-mode: forwards;
transform-origin: 50% 50%;
}

@keyframes back-animation {
0% {
    opacity: 1;
    transform: rotateY(-180deg) translateZ(96px);
}
20% {
    opacity: 1;
    transform: rotateY(-180deg) translateZ(48px);
}
70% {
    opacity: 1;
    transform: rotateY(-180deg) translateZ(48px);
}
90% {
    opacity: 1;
    transform: rotateY(-180deg) translateZ(96px);
}
100% {
    opacity: 1;
    transform: rotateY(-180deg) translateZ(96px);
}
}
.cube .sides .left {
animation: left-animation 3s ease infinite;
animation-delay: 100ms;
transform: rotateY(-90deg) translateZ(96px);
animation-fill-mode: forwards;
transform-origin: 50% 50%;
}

@keyframes left-animation {
0% {
    opacity: 1;
    transform: rotateY(-90deg) translateZ(96px);
}
20% {
    opacity: 1;
    transform: rotateY(-90deg) translateZ(48px);
}
70% {
    opacity: 1;
    transform: rotateY(-90deg) translateZ(48px);
}
90% {
    opacity: 1;
    transform: rotateY(-90deg) translateZ(96px);
}
100% {
    opacity: 1;
    transform: rotateY(-90deg) translateZ(96px);
}
}
.cube .sides .right {
animation: right-animation 3s ease infinite;
animation-delay: 100ms;
transform: rotateY(90deg) translateZ(96px);
animation-fill-mode: forwards;
transform-origin: 50% 50%;
}

@keyframes right-animation {
0% {
    opacity: 1;
    transform: rotateY(90deg) translateZ(96px);
}
20% {
    opacity: 1;
    transform: rotateY(90deg) translateZ(48px);
}
70% {
    opacity: 1;
    transform: rotateY(90deg) translateZ(48px);
}
90% {
    opacity: 1;
    transform: rotateY(90deg) translateZ(96px);
}
100% {
    opacity: 1;
    transform: rotateY(90deg) translateZ(96px);
}
}
</style>