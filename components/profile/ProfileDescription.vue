<template>
    <v-row :class="[marginSize, avatar]" max-width="250">
        <v-col cols="12" >
            <v-avatar :size="avatarSize" class="avatar-border">
                <v-img src="/images/LL1.jpg" alt="John">
                </v-img>
            </v-avatar>
        </v-col>
        <v-col cols="12" class="pb-0 ml-5">
            <v-row>
                <div class="text-h6">
                    Jhon Lisha
                </div>
                <v-btn depressed class="ml-auto mr-15" :color="followAndUnfollowColor" @click="changeStatusOfFollow" :loading="followLoading">
                    {{ followStatus }}
                </v-btn>
            </v-row>
        </v-col>
        <v-col cols="12" class="pt-0 ml-2 pb-0">
            <div class="text-caption text--secondary">
                @bigjhon
            </div>
        </v-col>
        <v-col cols="12" class="ml-2">
            <div class="text-caption">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, dolore.
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data: () => {
        return {
            avatarClass: "avatar-lg",
            follow: false,
            followLoading: false
        }
    },
    computed: {
        avatar() {
            if (this.$vuetify.breakpoint.lg) {
                return 'avatar-lg'
            } else if (this.$vuetify.breakpoint.md) {
                return 'avatar-md'
            }
        },
        avatarSize() {
            if (this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl) {
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
            if (this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl) {
                return 'ml-16'
            } else if (this.$vuetify.breakpoint.md) {
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