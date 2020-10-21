<template>
  <v-card
    class="pa-7"
    elevation="20"
    outlined>
    <div class="text-h3 text-center">Sign In</div>
    <v-divider class="my-6"></v-divider>
    <v-form>
      <v-text-field
        color="blue lighten-2"
        label="Username"/>
      <v-text-field
        color="blue lighten-2"
        label="Password"
        type="password"/>
      <v-btn
        class="mt-5"
        color="green darken-1"
        block
        depressed>
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
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'SignIn'
}
</script>

<style scoped>

</style>
