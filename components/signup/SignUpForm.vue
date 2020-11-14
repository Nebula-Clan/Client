<template>
  <v-card
    class="pa-7"
    elevation="20"
    outlined>
    <div class="text-h4 text-center">Signup now!</div>
    <v-divider class="my-6"></v-divider>
    <v-form v-model="valid" @submit.prevent="onSubmit">
      <v-text-field
        label="Username"
        outlined
        :rules="usernameRules"
        v-model="userInfo.username"
        append-icon="mdi-account"/>
      <v-text-field
        outlined
        :rules="emailRules"
        v-model="userInfo.email"
        label="E-mail"
        append-icon="mdi-account"/>
      <v-text-field
        v-model="userInfo.firstname"
        :rules="nameRules"
        outlined
        label="Firstname"
        append-icon="mdi-account"/>
      <v-text-field
        outlined
        :rules="nameRules"
        v-model="userInfo.lastname"
        label="Lastname"
        append-icon="mdi-account"/>
      <v-text-field
        outlined
        label="Password"
        :rules="passwordRules"
        v-model="userInfo.password"
        :append-icon="showPassword? 'mdi-eye': 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        :type="showPassword ? 'text': 'password'"/>
      <v-text-field
        outlined
        label="Confirm password"
        :rules="pswConfirmRules"
        v-model="userInfo.confirmPassword"
        :append-icon="showConfirmPassword? 'mdi-eye': 'mdi-eye-off'"
        @click:append="showConfirmPassword = !showConfirmPassword"
        :type="showConfirmPassword ? 'text': 'password'"/>
      <v-btn
        :disabled="!valid"
        class="mt-5"
        color="primary"
        type="submit"
        block>
        Sign Up
      </v-btn>
    </v-form>
    <v-divider class="my-6"></v-divider>
    <nuxt-link class="white--text" to="/login">I have account!</nuxt-link>

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

export default {
  name: 'signup-form',
  data: function () {
    return {
      valid: false,

      showPassword: false,
      showConfirmPassword: false,

      userInfo: {
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        confirmPassword: '',
      },

      usernameRules: [
        u => !!u || 'Username is required',
        u => u.length >= 4 || 'Username must be at least 4 characters or more'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      nameRules: [
        n => !!n || 'This field is required',
        n => n.length >= 3 || 'This field must be at least 3 characters or more'
      ],
      passwordRules: [
        p => !!p || 'Please enter password',
        p => p.length >= 8 || 'Password must be at least 8 characters or more',
      ],
      pswConfirmRules: [
        p => !!p || 'Please confirm password',
        p => p === this.userInfo.password || 'Password\'s not match'
      ],

      errorHandling: {
        hasError: false,
        msg: '',
      }
    }
  },
  methods: {
    ...mapActions('modules/authentication', ['registerUser']),
    onSubmit() {
      this.registerUser(this.userInfo).then((response) => {
        this.$auth.redirect('login')
      }).catch((error) => {
        if (error.response) {
          this.errorHandling.hasError = true
          this.errorHandling.msg = error.response.data.message
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
