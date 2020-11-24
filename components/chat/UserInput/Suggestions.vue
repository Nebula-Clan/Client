<template>
  <v-container>
    <v-btn v-for="(suggestion, idx) in suggestions" :key="idx" class="text-center" outlined rounded>
      {{ suggestion }}
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      suggestions: ['sfs', 'sfsf']
    }
  }
}
</script>

<style scoped>


</style>
