<template>
  <v-app>
    <v-content>
      <v-container class="login-section" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="4" offset-md="1">
            <AdvCarousel class="adv-section" />
          </v-col>
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-col cols="12" md="4">
                <v-row>
                  <SignIn :signup="setToSignUp()" class="signin-section" />
                </v-row>
              </v-col>
            </v-window-item>
            <v-window-item :value="2">
              <v-col cols="12" md="4">
                <v-row>
                  <SignUp :signin="setToSignIn()" class="signup-section" />
                </v-row>
              </v-col>
            </v-window-item>
          </v-window>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import SignIn from '../components/login-components/SignIn'
import AdvCarousel from '../components/login-components/AdvCarousel'
import SignUp from '../components/login-components/SignUp'
export default {
  layout: 'login-layout',
  components: {
    SignIn,
    AdvCarousel,
    SignUp
  },
  data: () => {
    return {
      step: 2
    }
  },
  methods: {
    setToSignIn () {
      this.step = 1
    },
    setToSignUp () {
      this.step = 2
    }
  }
}
</script>

<style scoped>
  .login-section {
    margin-top: 100px;
  }
  .adv-section {
    width: 480px;
    height: 600px;

  }
  .signin-col {

  }
  .signin-section {
    height: 600px;
    width: 420px;
    padding-top: 100px;
    padding-left: 60px;
  }

  .signup-section {
    height: 600px;
    width: 420px;
    padding-top: 40px;
    padding-left: 60px;
  }
</style>
