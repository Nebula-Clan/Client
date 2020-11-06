<template>
  <div class="login-page d-flex align-center">
      <v-row
        align="center"
        justify="center">
        <v-col cols="4"/>
        <v-col
          class="justify-center"
          cols="4">
          <SignInForm/>
        </v-col>
        <v-col cols="4"/>
      </v-row>
  </div>
</template>

<script>
import SignInForm from '@/components/login/SignInForm'
import Intro from '@/components/login/Intro'
export default {
  components: { SignInForm, Intro },
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
