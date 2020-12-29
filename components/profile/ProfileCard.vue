<template>
  <v-container fluid>
    <v-list-item two-line>
      <v-list-item-avatar size="50" :style="classForImageError">
        <Avatar :substituteChar="firstChar" :avatarUrl="getProfileImageUrl"
                :timeOut="5000" :avatarSize="50" :textSize="textClassForError"/>
      </v-list-item-avatar>
      <v-list-item-content class="ml-1">
        <v-list-item-title v-text="profile.firstname + profile.lastname"/>
        <v-list-item-subtitle v-text="profile.username"/>
      </v-list-item-content>
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
        if ((this.$vuetify.breakpoint.md || this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs)) {
          return 6
        }
        return 5
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
      },
      firstChar() {
        return this.profile.firstname.slice(0, 1).toUpperCase()
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
