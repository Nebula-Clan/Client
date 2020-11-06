<template>
  <v-btn
    class="mt-3 pa-5"
    :color="uiData.color"
    @click="onClick"
    block>
    <i :class="uiData.icon + ' mr-3'"/> {{ uiData.text }}
  </v-btn>
</template>

<script>
export default {
  name: "SocialButton",
  props: ['uiData', 'onClick']
}
</script>

<style scoped>

</style>
