<template>
    <v-row :class="[marginSize, avatar]" max-width="250">
        <v-col cols="12" >
            <v-avatar :size="avatarSize" class="avatar-border">
                <v-img :src="getProfileImageURL" alt="John">
                </v-img>
            </v-avatar>
        </v-col>
      <v-card class="pa-1" style="width: -moz-available">
        <v-col cols="12">
            <v-row class="d-flex justify-space-around">
                <div class="text-h6">
                    {{ getNickname }}
                </div>
                <v-btn depressed
                       :color="followAndUnfollowColor"
                       @click="changeStatusOfFollow"
                       :loading="followLoading">
                    {{ followStatus }}
                </v-btn>
            </v-row>
        </v-col>
        <v-col cols="12" class="pt-0 ml-2 pb-0">
            <div class="text-caption text--secondary">
                {{ '@' + getUsername }}
            </div>
        </v-col>
        <v-col cols="12" class="ml-2">
            <div class="text-caption">
                {{ getDescription }}
            </div>
        </v-col>
      </v-card>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => {
        return {
            avatarClass: "avatar-lg",
            follow: false,
            followLoading: false
        }
    },
    computed: {
        ...mapGetters('modules/profile/profileInfo', ['getNickname', 'getUsername', 'getDescription', 'getProfileImage', 'getProfileBannerImage']),
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
            } else if (this.$vuetify.breakpoint.md || this.$vuetify.breakpoint.lg) {
                return 'ml-12'
            } else if (this.$vuetify.breakpoint.sm) {
                return 'ml-8'
            } else if (this.$vuetify.breakpoint.xs) {
                return 'ml-2'
            }
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
        getProfileImageURL() {
            console.log(this.$axios.defaults.baseURL + this.getProfileImage)
            return this.$axios.defaults.baseURL + this.getProfileImage
        },
        getProfileBannerImageURL() {
            return this.$axios.defaults.baseURL + this.getProfileBannerImage()
        }
    },
    methods: {
        changeStatusOfFollow() {
            this.followLoading = true
            setTimeout(() => {
                this.follow = !this.follow
                this.followLoading = false
            }, 2000)
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
