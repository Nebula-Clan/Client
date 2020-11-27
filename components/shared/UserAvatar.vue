<template>
  <v-avatar size="40" class="avatar mx-4" :color="color">
    <img
      v-if="avatarSrc !== null"
      :src="$axios.defaults.baseURL + avatarSrc"
      alt="John">
    <span v-else class="white--text headline">{{ string }}</span>
  </v-avatar>
</template>

<script>
  export default {
    name: "UserAvatar",
    computed: {
      string() {
        if (this.avatarString === undefined) {
          return "";
        } else {
          return this.avatarString[0].toUpperCase();
        }
      },
    },
    props: ["avatarString", "avatarSrc", "color"]
  }
</script>

<style scoped>

</style>
