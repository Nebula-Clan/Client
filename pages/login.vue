<template>
  <div class="login-page d-flex align-center">
      <v-row
        align="center"
        justify="center">
        <v-col
          class="d-flex justify-center"
          cols="12">
          <SignIn/>
          <Intro/>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import SignIn from '~/components/login/SignIn'
import Intro from '@/components/login/Intro'
export default {
  components: { SignIn, Intro },
  data: () => ({})
}
</script>

<style lang="scss" scoped>
.login-page {
  background: url("../static/images/login-background.jpg") no-repeat;
  background-size: cover;
  height: 100%;
}
</style>
