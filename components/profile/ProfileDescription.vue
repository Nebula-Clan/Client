<template>
    <v-row :class="[marginSize, avatar]" max-width="250">
        <v-col cols="12" >
            <v-avatar :size="avatarSize" class='avatar-border' :eager="true" :style="classForImageError">
                <v-img v-if="!showImageByName" :src="getProfileImage" @load="imageLoaded">
                    <template v-slot:placeholder>
                        <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                        >
                        <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                        ></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
                <p :class="[textClassForError, 'mt-3']" v-else>
                    {{ firstCharOfProfileNickname }}
                </p>
            </v-avatar>
        </v-col>
        <v-col cols="12" class="pb-0 ml-5">
            <v-row>
                <div class="text-h6">
                    {{ profile.nickname }}
                </div>
                <v-btn depressed class="ml-auto mr-10" :color="followAndUnfollowColor" @click="changeStatusOfFollow" :loading="followLoading">
                    {{ followStatus }}
                </v-btn>
            </v-row>
        </v-col>
        <v-col cols="12" class="pt-0 ml-2 pb-0">
            <div class="text-caption text--secondary">
                {{ '@' + profile.username }}
            </div>
        </v-col>
        <v-col cols="12" class="ml-2">
            <div class="text-caption">
                {{ profile.description }}
            </div>
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => {
        return {
            avatarClass: "avatar-lg",
            follow: false,
            followLoading: false,
            isCompleted: false,
            hasError: false,
            showImageByName: false,
            errorTime: null
        }
    },
    computed: {
        ...mapGetters('modules/profile/profileInfo',['getProfile', 'getStatusOfReq']),
        profile() {
            return this.getProfile
        },
        avatar() {
            if (this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl) {
                return 'avatar-lg'
            } else if (this.$vuetify.breakpoint.md) {
                return 'avatar-md'
            } else {
                return 'avatar-sm'
            }
        },
        avatarSize() {
            if (this.$vuetify.breakpoint.xl || this.$vuetify.breakpoint.lg) {
                return 180
            } else if (this.$vuetify.breakpoint.md) {
                return 150
            } else if (this.$vuetify.breakpoint.sm) {
                return 100
            } else if (this.$vuetify.breakpoint.xs) {
                return 100
            }
        },
        marginSize() {
            if (this.$vuetify.breakpoint.xl) {
                return 'ml-16'
            } else if (this.$vuetify.breakpoint.lg) {
                return 'ml-8'
            } else if(this.$vuetify.breakpoint.md) {
                return 'ml-10'
            } else if (this.$vuetify.breakpoint.sm) {
                return 'ml-8'
            } else if (this.$vuetify.breakpoint.xs) {
                return 'ml-2'
            }
        },
        classForImageError() {
            if (this.showImageByName) {
                return {
                    'background-color': '#0D47A1'
                }
            }
            return ''
        },
        textClassForError() {
            if (this.showImageByName && (this.$vuetify.breakpoint.md || this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs)) {
                return 'text-h3'
            }
            return 'text-h2'
        },
        firstCharOfProfileNickname() {
            return this.profile.nickname.slice(0, 1).toUpperCase()
        },
        followStatus() {
            if (this.follow) {
                return 'Unfollow'
            } else {
                return 'Follow+'
            }
        },
        followAndUnfollowColor() {
            if (this.follow) {
                return 'blue darken-3'
            } else {
                return 'blue darken-1'
            }
        },
        watchReqUntilCompleted() {
            if (this.getStatusOfReq) {
                console.log('done')
                this.errorTime = setTimeout(() => {
                    this.hasError = true
                }, 12000)
                this.isCompleted = true
            }
            return this.isCompleted
        },
        getProfileImage() {
            this.watchReqUntilCompleted
            if (this.hasError) {
                this.showImageByName = true
                return ''
            }
            return this.$axios.defaults.baseURL + this.profile.profileImageUrl
        }
    },
    methods: {
        changeStatusOfFollow() {
            this.followLoading = true
            setTimeout(() => {
                this.follow = !this.follow
                this.followLoading = false
            }, 2000)
        },
        imageLoaded(event) {
            if (this.errorTime) {
                clearTimeout(this.errorTime)
                this.errorTime = null
            }
        }
    }
}
</script>

<style scoped>

.avatar-lg {
    margin-top: -200px;
}

.avatar-md {
    margin-top: 0px;
}

.avatar-sm {
    margin-top: 0px;
}

.avatar-sm {
    margin-top: 0px;
}

.avatar-border {
    border: 5px solid #12232E;
}

</style>