<template>
    <v-list-item two-line class="back-status">
        <v-list-item-content class="py-1">
            <v-list-item-title style="cursor: pointer;" @click="profileViewOverlay = true"> 
                {{ getProfileName }} 
            </v-list-item-title>
            <v-list-item-subtitle :class="getLastSeenTextColor"> {{ getLastSeen }} </v-list-item-subtitle>
        </v-list-item-content>
        <v-overlay
        :z-index="99"
        :value="profileViewOverlay"
        opacity="0.8"
        >
            <ProfileView :profile="profile" @cancel="profileViewOverlay = false"  />
        </v-overlay>
    </v-list-item>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import ProfileView from './ProfileView'

export default {
    props: {
        profile: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
            textColor: '',
            hasStatus: false,
            statusText: 'last seen recently',
            profileViewOverlay: false
        }
    },
    computed: {
        getProfileName() {
            if (this.profile != undefined) {
                return this.profile.firstname
            }

            return ''
        },
        getLastSeen() {
            if (this.profile !== undefined && this.profile !== null) {
                if (this.profile.profileStatus !== null && this.profile.profileStatus !== undefined) {
                    this.getStatus(this.profile.profileStatus).then((status) => {
                        if (status !== undefined) {
                            this.setStatus(status.text, status.textColor, true)
                        } else {
                            this.lastSeenStatus()
                        }
                    })
                } else if (this.profile.profileStatus !== null && this.profile.profileStatus !== undefined) {
                    this.lastSeenStatus()
                } else {
                    this.setStatus('last seen recently', '', false)
                }
            }
            
            return this.statusText
        },
        getLastSeenTextColor() {
            if (this.hasStatus) {
                return this.textColor
            } else {
                return ''
            }
        }
    },
    methods: {
        ...mapActions('modules/chat/chatManager', ['getStatus']),
        getTimeElapse(time) {
            const unixTime = time.getTime()
            const now = new Date().getTime()
            if (now - unixTime < 36e+5) {
            return Math.floor((now - unixTime) / 60000) + ' m'
            } else if (now - unixTime > 36e+5 && now - unixTime < 36e+5 * 24) {
            return Math.floor((now - unixTime) / 36e+5) + ' h'
            } else {
            return Math.floor((now - unixTime) / (36e+5 * 24)) + ' day(s)'
            }
        },
        setStatus(statusText, textColor, hasStatus) {
            this.textColor = textColor
            this.hasStatus = hasStatus
            this.statusText = statusText
        },
        lastSeenStatus() {
            if (this.profile.profileStatus !== null && this.profile.profileStatus !== undefined) {
                let lastSeen = `${this.getTimeElapse(this.profile.lastSeen)} ago`
                this.setStatus(lastSeen, '', false)
            }
        }
    }
    
}
</script>


<style scoped>

.back-status {
    	/* #2d383c */
    background-color: 	#2f3136;
}
</style>