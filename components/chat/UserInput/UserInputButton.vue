<template>
  <button class="sc-user-input--button-icon-wrapper">
    <IconBase width="20" height="20">
      <slot />
    </IconBase>
  </button>
</template>

<script>
import IconBase from './icons-utils/IconBase.vue'

export default {
  components: {
    IconBase
  }
}
</script>

<style scoped>
.sc-user-input--button-icon-wrapper {
  background: none;
  border: none;
  padding: 0px;
  margin: 0px;
  outline: none;
  cursor: pointer;
}
</style>
