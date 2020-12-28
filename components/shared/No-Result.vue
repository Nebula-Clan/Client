<template>
  <div>
    <v-img
      class="mx-auto"
      :src="require('~/static/user-settings/empty.svg')"
      alt="empty"
      max-width="600px"
      contain/>
    <v-alert
      border="left"
      colored-border
      type="info"
      elevation="2">
      Did not match any {{text}}.
    </v-alert>
  </div>
</template>

<script>
  export default {
    name: "No-Result",
    props: ['text']
  }
</script>

<style scoped>

</style>