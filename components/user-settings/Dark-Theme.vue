<template>
    <div elevation="1" color="black" class="theme-temp rounded d-flex elevation-2 ma-2">
      <div class="purple text-center white--text">Huddle</div>
      <div class="body d-flex align-center justify-space-around">
          <v-btn x-small outlined class="pri-btn darken-4">primary</v-btn>
          <v-btn x-small outlined class="acc-btn darken-3">accent</v-btn>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Dark-Theme'

}
</script>

<style lang="scss" scoped>
.theme-temp {
    background-color: #1f1f1f;
    width: 13rem;
    height: 7rem;
    border: 1px solid #dddd;
    flex-direction: column;
    .body {
        height: 100%;
        .pri-btn {
            color: #BB86FC;
        }
        .acc-btn {
            color: #4aff80;
        }
    }
}
</style>