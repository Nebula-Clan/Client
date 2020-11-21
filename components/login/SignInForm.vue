<template>
  <v-card
    class="pa-7"
    elevation="20"
    outlined>
    <div class="text-h4 text-center">Login</div>
    <v-divider class="my-6"></v-divider>
    <v-form v-model="formValid" @submit.prevent="onSubmit">
      <v-text-field
        label="Username"
        :rules="fieldRules"
        v-model="username"
        outlined
        append-icon="mdi-account"/>
      <v-text-field
        label="Password"
        :rules="fieldRules"
        v-model="password"
        outlined
        :append-icon="passwordVisible? 'mdi-eye': 'mdi-eye-off'"
        @click:append="passwordVisible = !passwordVisible"
        :type="passwordVisible ? 'text': 'password'"/>
      <v-btn
        class="mt-5"
        color="primary"
        outlined
        :loading="isLoggingIn"
        :disabled="!formValid"
        type="submit"
        block>
        Sign In
      </v-btn>
    </v-form>
    <v-divider class="my-6"/>
    <div>
      <SocialButton :uiData="socialAccounts.github" :on-click="loginGithub"/>
      <SocialButton :uiData="socialAccounts.google" :on-click="loginGoogle"/>
      <SocialButton :uiData="socialAccounts.facebook" :on-click="loginFacebook"/>
      <v-divider class="my-6"/>
      <nuxt-link class="white--text" to="/signup">Or sign up now!</nuxt-link>
    </div>
    <v-snackbar
      v-model="errorHandling.hasError"
      color="red darken-4"
      :timeout="4000">

      {{ errorHandling.msg }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="errorHandling.hasError = false">
          Dismiss
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import {mapActions} from 'vuex'
import SocialButton from "@/components/buttons/SocialButton";

export default {
  name: 'SignIn',
  components: { SocialButton },
  data: () => {
    return {
      formValid: false,
      passwordVisible: false,
      username: '',
      password: '',
      fieldRules: [
        u => !!u || 'This field is required'
      ],

      socialAccounts: {
        github: {
          text: 'Sign in with Github',
          icon: 'fab fa-github',
          color: 'black'
        },
        google: {
          text: 'Sign in with Google',
          icon: 'fab fa-google',
          color: 'red darken-1'
        },
        facebook: {
          text: 'Sign in with Facebook',
          icon: 'fab fa-facebook-f ',
          color: 'blue darken-1'
        }
      },

      isLoggingIn: false,
      errorHandling: {
        hasError: false,
        msg: '',
      }
    }
  },
  methods: {
    ...mapActions('modules/authentication', ['login']),
    onSubmit() {
      this.isLoggingIn = true;
      this.login({
        username: this.username,
        password: this.password
      }).then((response) => {
        this.$notifier.showMessage({content: "Logged in Successfully", color: 'success'});
        this.$auth.redirect('home');
      }).catch((error) => {
        this.isLoggingIn = false;
        console.log(error.response);
        if (error.response) {
            this.errorHandling.hasError = true;
            this.errorHandling.msg = error.response.data.error.message;
        }
      })
    },
    loginGithub() {
      this.$auth.loginWith('github');
    },
    loginGoogle() {

    },
    loginFacebook() {

    }
  }
}
</script>

<style scoped>
</style>
