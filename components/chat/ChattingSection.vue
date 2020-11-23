<template>
    <v-container fluid class="fill-height pa-0 back">
        <v-row no-gutters>
            <v-col cols="12" class="overflow-y-auto">

            </v-col>
        </v-row>
        <v-row no-gutters class="mt-auto">
            <v-col cols="12">
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
</template>

<script>
import UserInput from './UserInput'
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

.back {
  background-color: #1E1E1E;
}

</style>