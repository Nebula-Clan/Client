
<template>
    <v-list-item two-line>
        <v-list-item-avatar size="50" class="avatar-border">
            <Avatar class="avatar-border" :substituteChar="getProfileFirstChar" :avatarUrl="getProfileImgUrl"
            :timeOut="12000" :avatarSize="50" :textSize="5" :avatarProperty="profileAvatar" />
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title v-html="getProfileTitle"></v-list-item-title>
            <v-list-item-subtitle v-html="getProfileUsername">
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Avatar from '~/components/shared/Avatar'
export default {
    props: {
        profile: {
            type: Object,
            required: true,
        },
        searchedText: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            usernameHtml: '',
            textColor: '',
            hasStatus: false
        }
    },
    mounted() {
        this.usernameHtml = this.injectHtml(this.profile.username, this.searchedText)
    },
    computed: {
        profileAvatar() {
            return {
                'tile': true
            }
        },
        getProfileFirstChar() {
            return this.profile.firstname.slice(0, 1).toUpperCase()
        },
        getProfileImgUrl() {
            return this.$axios.defaults.baseURL + this.profile.profileImageUrl
        },
        getProfileTitle() {
            return `${this.getProfileFirstName} ${this.getProfileLastName}`
        },
        getProfileUsername() {
            return this.injectHtml(this.profile.username, this.searchedText)
        },
        getProfileLastName() {
            return this.injectHtml(this.profile.lastname, this.searchedText)
        },
        getProfileFirstName() {
            return this.injectHtml(this.profile.firstname, this.searchedText)
        }
    },
    methods: {
        injectHtml(text, textToInject) {
            let lowerCaseText = text.toLowerCase()
            let lowerCaseInjectText = textToInject.toLowerCase()

            let matchReg = new RegExp(lowerCaseInjectText)
            let startIndex = matchReg.exec(lowerCaseText)
            if (startIndex === null || startIndex === undefined) {
                return text.replace(textToInject, `<span style="color:red">${textToInject}</span>`)
            }
            let extractedTextToInject = text.slice(startIndex.index, startIndex.index + textToInject.length)

            return text.replace(extractedTextToInject, `<span class="primary--text">${extractedTextToInject}</span>`)
        }
    }
}
</script>

<style scoped>
.avatar-border {
    border-radius: 10px;
}

</style>