<template>
  <div>
    <EmojiPicker v-if="isActive" :on-blur="_handlePickerBlur" @emojiClicked="nofityClickedEmoji" />
    <v-icon  @click="isActive = !isActive" style="filter: contrast(50%);">
      mdi-emoticon-outline
    </v-icon>
  </div>
</template>

<script>
import EmojiPicker from './../EmojiPicker'

export default {
  components: {
    EmojiPicker
  },
  data() {
    return {
      isActive: false
    }
  },
  mounted() {
    this.$nuxt.$on('hideEmoji', this.hideEmojiPicker)
  },
  methods: {
    _openPicker(e) {
      this.isActive = !this.isActive
    },
    _handlePickerBlur() {
      this.isActive = false
    },
    nofityClickedEmoji(emoji) {
      this.$emit('emoji', emoji)
    },
    hideEmojiPicker() {
      this.isActive = false
    }
  }
}
</script>

<style scoped>
.sc-user-input--emoji-icon-wrapper {
  background: none;
  border: none;
  padding: 0px;
  margin: 0px;
  outline: none;
}

.sc-user-input--emoji-icon-wrapper:focus {
  outline: none;
}

.sc-user-input--emoji-icon {
  height: 18px;
  cursor: pointer;
  align-self: center;
}

.sc-user-input--emoji-icon-wrapper:focus .sc-user-input--emoji-icon path,
.sc-user-input--emoji-icon-wrapper:focus .sc-user-input--emoji-icon circle,
.sc-user-input--emoji-icon.active path,
.sc-user-input--emoji-icon.active circle,
.sc-user-input--emoji-icon:hover path,
.sc-user-input--emoji-icon:hover circle {
  filter: contrast(15%);
}
</style>
