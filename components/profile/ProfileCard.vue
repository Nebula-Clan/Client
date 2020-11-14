<template>
    <v-container fluid>
        <v-list-item two-line>
            <v-list-item-avatar size="50" :style="classForImageError">
                <v-img v-if="!hasError" :src="getProfileImageUrl" @error="handleImagError" @load="imageLoaded">
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
                <p :class="[textClassForError, 'mt-4']" v-else>
                    {{ profile.firstname.slice(0, 1).toUpperCase() }}
                </p>
            </v-list-item-avatar>
            <v-list-item-content class="ml-1">
                <v-list-item-title v-text="profile.firstname + profile.lastname"></v-list-item-title>
                <v-list-item-subtitle v-text="profile.username"></v-list-item-subtitle>
            </v-list-item-content>
            <!-- <v-list-item-action>
                <v-btn v-if="!item.isFollower" class="px-5" color="primary" small> Follow </v-btn>
                <v-btn v-else color="error" small outlined> Unfollow </v-btn>
            </v-list-item-action> -->
        </v-list-item>
    </v-container>
</template>

<script>
export default {
    props: {
        profile: {
            type: Object,
            required: true
        }
    },
    data: () => {
        return {
            hasError: false,
            isImageLoaded: false,
            errorTime: null
        }
    },
    computed: {
        textClassForError() {
            if (this.hasError && (this.$vuetify.breakpoint.md || this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs)) {
                return 'text-h6'
            }
            return 'text-h5'
        },
        classForImageError() {
            if (this.hasError) {
                return {
                    'background-color': '#0D47A1'
                }
            }
            return ''
        },
        getProfileImageUrl() {
            return this.$axios.defaults.baseURL + this.profile.profileImageUrl
        }
    },
    methods: {
        handleImagError(event) {
            if (!this.errorTime) {
                this.errorTime = setTimeout(() => {
                    this.hasError = true
                }, 6000)
            }
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

</style>