<template>
  <div class="login-page">
    <v-container
      style="height: 100%">
      <v-row
        style="height: 100%"
        align="center"
        justify="center">
        <v-col cols="1"></v-col>
        <v-col
          class="mt-n8"
          cols="6">
          <AdvertiseCarousels/>
        </v-col>
        <v-col
          class="mt-n8"
          cols="4">
          <SignIn/>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SignIn from '~/components/login/SignIn'

export default {
  components: { SignIn },
  data: () => ({})
}
</script>

<style scoped>
.login-page {
  background: url("../static/images/login-background.jpg") no-repeat;
  background-size: cover;
  height: 100%;
}
</style>
