<template>
  <div class="login-page d-flex align-center">
      <v-row
        align="center"
        justify="center">
        <v-col
          class="d-flex justify-center"
          cols="12">
          <SignIn/>
          <img
            class="elevation-20 intro-img"
            src="../static/images/unnamed.jpg"
            alt="">
        </v-col>
      </v-row>
  </div>
</template>

<script>
import SignIn from '~/components/login/SignIn'
import AdvertiseCarousels from '~/components/login/AdvertiseCarousels'
export default {
  components: { SignIn, AdvertiseCarousels },
  data: () => ({})
}
</script>

<style lang="scss" scoped>
.login-page {
  background: url("../static/images/login-background.jpg") no-repeat;
  background-size: cover;
  height: 100%;
  .intro-img {
    border-radius: 0 10px 10px 0;
  }
}
</style>
