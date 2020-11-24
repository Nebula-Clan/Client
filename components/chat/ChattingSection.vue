<template>
    <v-content style="height:100vh">
      <v-container fluid pa-0 class="d-flex flex-column flex-grow-1 fill-parent-height">
        <v-row no-gutters class="top-row flex-grow-1 flex-shrink-1">
          <v-col cols="12" class="scrollable">
	            <v-row v-for="i in 40" :key="i">
                    <v-col cols="12">
                        <Message />
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
                    @onType="$emit('onType')"
                    @edit="$emit('edit', $event)"
                    />
                </v-container>
            </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
import UserInput from './UserInput/UserInput'
import Message from './Message/Message'
export default {
    data() {
        return {
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
    methods: {
        s() {
            console.log('submit')
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
  background-color: #1E1E1E;
}

.scrollable {
    overflow-y: auto;
    height: 90vh;
  }

.tab-stick {
    top: 0px;
    position: sticky;
    position: -webkit-sticky;
    z-index: 5;
}
</style>