<template>
  <v-app>
    <v-content class="signin">
      <v-col
        class="login-section"
        cols="12"
        md="8"
        sm="8"
        align="center"
        justify="center"
      >
        <v-row
          align="center"
          justify="center"
        >
          <h2>Sign In</h2>
        </v-row>
        <v-row class="input-fields">
          <v-text-field
            label="Username"
            hide-details="auto"
          />
        </v-row>
        <v-row class="input-fields">
          <v-text-field
            label="Password"
            hide-details="true"
            type="password"
          />
        </v-row>
        <v-row style="width:300px">
          <v-btn
            depressed
            color="#1E88E5"
            class="SignUp-btn"
            @click="signUp()"
          >
            Sign Up
          </v-btn>
          <v-btn
            depressed
            color="#1DE9B6"
            class="login-btn"
          >
            Sign In
          </v-btn>
        </v-row>
      </v-col>
    </v-content>
  </v-app>
</template>

<script>
export default {
  methods: {
    signUp () {
      this.$emit('signup')
    }
  }
}
</script>

<style scoped>
    .signin {
        height: 600px;
    }

    .login-section {
        width: 420px;
    }

    .input-fields {
        width: 300px;
    }

    .login-btn {
        margin-top: 20px;
        margin-left: auto;
    }

    .SignUp-btn{
        margin-top: 20px;
        left: 0px;
    }
</style>
