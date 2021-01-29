<template>
  <div color="white" class="theme-temp rounded d-flex elevation-2 ma-2">
      <div class="blue text-center white--text">Huddle</div>
      <div class="body d-flex align-center justify-space-around">
          <v-btn x-small outlined color="blue">primary</v-btn>
          <v-btn x-small outlined color="teal" class="darken-3">accent</v-btn>
      </div>
  </div>
</template>

<script>
export default {
    name: 'LightTheme'

}
</script>

<style lang="scss" scoped>
.theme-temp {
    width: 13rem;
    height: 7rem;
    border: 1px solid black;
    flex-direction: column;
    .body {
        background-color: white;
        height: 100%;
    }
}
</style>