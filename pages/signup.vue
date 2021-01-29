<template>
  <div
    class="signup d-flex align-center">
    <v-row
      align="center"
      justify="center">
      <v-col
        :cols="(12-signupColumns)/2"/>
      <v-col
        class="justify-center"
        :cols="signupColumns">
        <SignUpForm/>
      </v-col>
      <v-col
        :cols="(12-signupColumns)/2"/>
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
    },
    computed: {
      signupColumns() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return 12;
          case 'sm':
            return 10;
          case 'md':
            return 4;
          case 'lg':
            return 4;
          case 'xl':
            return 4;
        }
      }
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
