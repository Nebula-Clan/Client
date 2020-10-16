<template>
  <div class="login-page">
    <v-container>
      <v-row class="mt-10" align="center" justify="center">
        <v-col
          cols="6">
          <AdvertiseCarousels/>
        </v-col>
        <v-col
          cols="6">
          <SignIn/>
        </v-col>
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
