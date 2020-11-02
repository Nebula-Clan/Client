<template>
  <v-card
    class="pa-7 border-lay"
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
        :disabled="!formValid"
        type="submit"
        block>
        Sign In
      </v-btn>
    </v-form>
    <v-divider class="my-6"></v-divider>
    <div>
      <v-btn
        class="mt-3 pa-5"
        color="black"
        @click="loginGithub"
        block>
        <i class="fab fa-github mr-3"/> Sign in with Github
      </v-btn>
      <v-btn
        class="mt-3 pa-5"
        color="red darken-1"
        block>
        <i class="fab fa-google mr-3"/> Sign in with Google
      </v-btn>
      <v-btn
        class="mt-3 pa-5"
        color="blue darken-1"
        block>
        <i class="fab fa-facebook-f mr-3"/> Sign in with Facebook
      </v-btn>
      <v-divider class="my-6"></v-divider>
      <nuxt-link class="white--text" to="/signup">Or sign up now!</nuxt-link>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignIn',
  data: () => {
    return {
      formValid: false,
      passwordVisible: false,
      username: '',
      password: '',
      fieldRules: [
        u => !!u || 'This field is required'
      ],
    }
  },
  methods: {
    ...mapActions('modules/authentication', ['login']),
    onSubmit () {
      this.login({
        username: this.username,
        password: this.password
      }).then((response) => {
        console.log(response)
      }).catch((e) => {
        console.error(e)
      })
    },
    loginGithub(){
      this.$auth.loginWith('github');
    }
  }
}
</script>

<style scoped>
.border-lay {
  border-radius: 10px 0 0 10px;
  border: none;
}
</style>
