<template>
  <v-avatar
    :size="size === undefined ? 40 : size"
    class="avatar mx-4"
    :color="avatarSrc !== null ? '' : color">
    <img
      v-if="avatarSrc !== null"
      :src="avatarSrc"
      :alt="avatarString">
<!--    <img-->
<!--      v-if="avatarSrc !== null"-->
<!--      :src="$axios.defaults.baseURL + avatarSrc"-->
<!--      :alt="avatarString">-->
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
    props: ["avatarString", "avatarSrc", "color", 'size']
  }
</script>

<style scoped>

</style>
