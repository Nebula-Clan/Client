
<template>
    <v-list-item two-line>
        <v-list-item-avatar size="50" class="avatar-border">
            <v-badge
                :value="isOnline"
                color="teal lighten-2"
                overlap
                right
                bottom
                dot
                offset-x="11"
                offset-y="11"
            >
                <Avatar class="avatar-border" :substituteChar="getProfileFirstChar" :avatarUrl="getProfileImgUrl"
                :timeOut="12000" :avatarSize="50" :textSize="5" :avatarProperty="profileAvatar" @error="imgError" />
            </v-badge>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title >{{ profile.firstname }}</v-list-item-title>
            <v-list-item-subtitle :class="getLastSeenTextColor">{{ getProfileStatusOrMessage }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="py-3">
                <v-badge v-if="unseenMessageShow" :content="profile.numberOfUnseenMessages" class="mr-5 mt-3">
                </v-badge>
        </v-list-item-action>
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
        }
    },
    data() {
        return {
            subtitleText: '',
            textColor: '',
            hasStatus: false
        }
    },
    watch: {
        'profile.lastMessage': {
            handler: function(val, oldVal) {
                this.setLastMessage(this.profile.lastMessage)
                this.$forceUpdate()
            },
            deep: true
        },
        'profile.profileStatus': {
            handler: function(val, oldVal) {
                this.getStatus(val).then((status) => {
                    if (status !== undefined && status.preferred) {
                        this.setStatus(status.text, status.textColor)
                    } else {
                        this.setLastMessage(this.profile.lastMessage)
                    }
                    this.$forceUpdate()
                })
            },
            deep: true
        }
    },
    mounted() {
        this.setLastMessage(this.profile.lastMessage)
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
        getProfileStatusOrMessage() {
            return this.subtitleText
        },
        getLastSeenTextColor() {
            if (this.hasStatus) {
                return this.textColor
            } else {
                return ''
            }
        },
        unseenMessageShow() {
            if (this.profile.numberOfUnseenMessages === 0) {
                return false
            }
            return true
        },
        isOnline() {
            if (this.profile !== undefined) {
                if (this.profile.lastSeen === 'online') {
                    return true
                }
            }

            return false
        }
    },
    methods: {
        ...mapActions('modules/chat/chatManager', ['getStatus', 'setValidationOfProfileImg']),
        imgError() {
            this.setValidationOfProfileImg({
                username: this.profile.username,
                isValid: false
            })
        },
        setStatus(text, textColor) {
            this.subtitleText = text
            this.textColor = textColor
            this.hasStatus = true
        },
        setLastMessage(messageInstance) {
            if (messageInstance.messageType !== 0) {
                this.textColor = 'blue--text text--lighten-1'
                this.subtitleText = this.profile.lastMessage.fileName
                this.hasStatus = true
            } else {
                this.textColor = ''
                this.subtitleText = this.profile.lastMessage.messageBody
                this.hasStatus = false
            }
        }
    }
}
</script>

<style scoped>
.dot {
  height: 10px;
  width: 10px;
  background-color:#4DB6AC;
  border-radius: 50%;
  display: inline-block;
  margin-left: 32px;
  margin-top: 37px;
  z-index: 10;
}

.avatar-border {
    border-radius: 10px;
}

.new-message {
    border-radius: 50%;
    box-shadow: 0px 0px 5px #2196F3;
}
</style>