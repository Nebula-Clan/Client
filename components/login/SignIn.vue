<template>
  <v-card
    class="pa-7 border-lay"
    elevation="20"
    outlined>
    <div class="text-h4 text-center">Login</div>
    <v-divider class="my-6"></v-divider>
    <v-form>
      <v-text-field
        color="blue lighten-2"
        label="Username"
        append-icon="mdi-account"/>
      <v-text-field
        color="blue lighten-2"
        label="Password"
        :append-icon="passwordVisible? 'mdi-eye': 'mdi-eye-off'"
        @click:append="passwordVisible = !passwordVisible"
        :type="passwordVisible ? 'text': 'password'"/>
      <v-btn
        class="mt-5"
        color="green darken-2"
        block>
        Sign In
      </v-btn>
    </v-form>
    <v-divider class="my-6"></v-divider>
    <div>
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
      <nuxt-link class="white--text text-decoration-none" to="/signup">Or sign up now!</nuxt-link>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'SignIn',
  data: () => {
    return {
      passwordVisible: false
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
