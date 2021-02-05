<template>
  <v-card>
    <v-card-title>
      {{this.name}}
    </v-card-title>
    <v-card-subtitle>About</v-card-subtitle>
    <v-card-text>
      {{this.about}}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "About",
  props: ['name', 'about']
}
</script>

<style scoped>

</style>
