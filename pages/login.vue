<template>
  <div class="login-page d-flex align-center">
    <v-row
      align="center"
      justify="center">
      <v-col
        :cols="(12-loginColumns)/2"/>
      <v-col
        class="justify-center"
        :cols="loginColumns">
        <SignInForm/>
      </v-col>
      <v-col
        :cols="(12-loginColumns)/2"/>
    </v-row>
  </div>
</template>

<script>
  import SignInForm from '@/components/login/SignInForm'
  import Intro from '@/components/login/Intro'

  export default {
    components: { SignInForm, Intro },
    data: () => ({}),
    computed: {
      loginColumns() {
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

<style lang="scss" scoped>
  .login-page {
    background: url("../static/images/login-background.jpg") no-repeat;
    background-size: cover;
    height: 100%;
  }
</style>
