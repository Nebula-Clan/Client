<template>
    <v-container class="user-list-color ml-0 overflow-y-auto" :style="userListHeight">
        <v-row dense>
            <v-col cols="12">
                <v-container class="py-0 d-inline-flex">
                    <p class="text-h4 pl-1 mb-0 text--secondary"> Chats </p>
                    <v-icon class="ml-auto">mdi-dots-vertical</v-icon>
                </v-container>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12">
                <v-container class="pb-0">
                        <v-text-field
                            hide-details
                            prepend-inner-icon="mdi-account-search"
                            label="Search pepole"
                            single-line
                            solo
                            dense
                            class="search-field"
                        ></v-text-field>
                </v-container>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="pb-0">
                <v-container>
                    <template v-for="(profile, index) in getChatList" class="pl-0">
                        <Profile :key="(index + 1) * 23" class="pl-0" :profile="profile" />
                        <v-divider :key="(index + 1) * 27" class="ml-14 mr-3"></v-divider>
                    </template>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'


import Profile from '~/components/chat/Profile'
export default {
    data() {
        return {
            n: 10,
            window: {
                width: 0,
                height: 0
            },
            isReqCompleted: false,
            readyState: -1
        }
    },
    computed: {
        ...mapGetters('modules/chat/chatManager',['getWebSocket', 'getProfileList']),
        userListHeight() {
            return {
                'max-height': this.window.height + 'px'
            }
        },
        getChatList() {
            return this.getProfileList
        }
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    mounted() {
        this.getWebSocket.AddOnOpenHandler(this.onOpenHandler)
        this.getWebSocket.AddOnMessageHandler(this.onMessageHandler)

        this.readyState = this.getWebSocket.readyState
        if (this.readyState == 1) {
            this.reqChats()
            this.getWebSocket.DeleteOnOpenHandler(this.onOpenHandler)
        }
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        ...mapActions('modules/chat/chatManager', ['addProfile']),
        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        },
        onOpenHandler(event) {
            this.reqChats()
        },
        onMessageHandler({ data }) {
            data = JSON.parse(data)
            if (data.type == 'chat.users') {
                data.data.forEach((item, index) => {
                    this.addProfile(item)
                })
            }
        },
        reqChats() {
            if (this.getWebSocket.readyState == 1) {
                this.getWebSocket.GetChatUsers()
                this.isReqCompleted = true
            }
        }
    }
}
</script>

<style scoped>

.user-list-color {
    background-color: #2f3136;
}

.scroll {
    overflow: hidden;
}

.search-field {
    background-color:#202023;
    border-radius: 10px;
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