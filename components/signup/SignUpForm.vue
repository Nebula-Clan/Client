<template>
  <v-card
    class="pa-7 border-lay"
    elevation="20"
    outlined>
    <div class="text-h4 text-center">Signup now!</div>
    <v-divider class="my-6"></v-divider>
    <v-form v-model="valid">
      <v-text-field
        color="blue lighten-2"
        label="Username"
        :rules="usernameRules"
        v-model="username"
        append-icon="mdi-account"/>
      <v-text-field
        color="blue lighten-2"
        :rules="emailRules"
        v-model="email"
        label="E-mail"
        append-icon="mdi-account"/>
      <v-text-field
        v-model="firstname"
        :rules="nameRules"
        color="blue lighten-2"
        label="Firstname"
        append-icon="mdi-account"/>
      <v-text-field
        color="blue lighten-2"
        :rules="nameRules"
        v-model="lastname"
        label="Lastname"
        append-icon="mdi-account"/>
      <v-text-field
        color="blue lighten-2"
        label="Password"
        :rules="passwordRules"
        v-model="password"
        :append-icon="showPassword? 'mdi-eye': 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        :type="showPassword ? 'text': 'password'"/>
      <v-text-field
        color="blue lighten-2"
        label="Confirm password"
        :rules="pswConfirmRules"
        v-model="confirmPassword"
        :append-icon="showConfirmPassword? 'mdi-eye': 'mdi-eye-off'"
        @click:append="showConfirmPassword = !showConfirmPassword"
        :type="showConfirmPassword ? 'text': 'password'"/>
      <v-btn
        :disabled="!valid"
        class="mt-5"
        color="green darken-2"
        block>
        Sign Up
      </v-btn>
    </v-form>
    <v-divider class="my-6"></v-divider>
    <div>
      <v-btn
        class="mt-3 pa-5"
        color="red darken-1"
        block>
        <i class="fab fa-google mr-3"/> Sign up with Google
      </v-btn>
      <v-btn
        class="mt-3 pa-5"
        color="blue darken-1"
        block>
        <i class="fab fa-facebook-f mr-3"/> Sign up with Facebook
      </v-btn>
      <v-divider class="my-6"></v-divider>
      <nuxt-link class="white--text" to="/login">I have account!</nuxt-link>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "signup-form",
  data: function () {
    return {
      valid: false,

      showPassword: false,
      showConfirmPassword: false,

      username: '',
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      confirmPassword: '',

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
        p => p === this.password || 'Password\'s not match'
      ]
    }
  },
}
</script>

<style scoped>
  .border-lay {
    border-radius: 10px 0 0 10px;
    border: none;
  }
</style>
