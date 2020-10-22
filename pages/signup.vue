<template>
  <div
    class="signup d-flex align-center">
    <v-row
      align="center"
      justify="center">
      <v-col
        class="d-flex justify-center"
        cols="12">
        <SignUpForm/>
        <intro/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SignUpForm from '@/components/signup/SignUpForm'
import Intro from '@/components/login/Intro'

export default {
  name: 'signup',
  components: {
    Intro,
    SignUpForm
  }
}
</script>

<style scoped>
.signup {
  background: url("../static/images/login-background.jpg") no-repeat;
  background-size: cover;
  height: 100%;
}
</style>
