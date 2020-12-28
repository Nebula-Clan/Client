<template>
  <v-avatar
    :size="size === undefined ? 40 : size"
    class="avatar mx-4"
    :color="!isImageEmpty() ? '' : color">
    <span v-if="isImageEmpty()" class="white--text headline">{{ string }}</span>
    <img
      v-else
      :src="$axios.defaults.baseURL + avatarSrc"
      :alt="avatarString">
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
    methods: {
      isImageEmpty() {
        if (this.avatarSrc === undefined) return true;
        if (this.avatarSrc === null) return true;
        return this.avatarSrc.search('null') !== -1;
      }
    },
    props: ["avatarString", "avatarSrc", "color", 'size']
  }
</script>

<style scoped>

</style>
