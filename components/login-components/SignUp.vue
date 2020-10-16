<template>
  <v-app>
    <v-content>
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
          <h2>Sign Up</h2>
        </v-row>
        <v-row class="input-fields">
          <v-text-field
            label="Username"
            hide-details="auto"
          />
        </v-row>
        <v-row class="input-fields">
          <v-text-field
            label="Email"
            hide-details="true"
            type="email"
          />
        </v-row>
        <v-row class="input-fields">
          <v-text-field
            label="Password"
            hide-details="true"
            type="password"
          />
        </v-row>
        <v-row class="input-fields">
          <v-text-field
            label="Confirm Password"
            hide-details="true"
            type="password"
          />
        </v-row>
        <v-row class="gender-checkboxes">
          <v-checkbox
            v-model="ex4"
            label="Female"
            color="pink"
            value="red"
            hide-details
          />
          <v-checkbox
            v-model="ex4"
            label="Male"
            color="blue"
            value="red"
            hide-details
            style="margin-left:auto"
          />
        </v-row>
        <v-row style="width:300px">
          <v-btn
            depressed
            color="#1DE9B6"
            class="login-btn"
            @click="signIn()"
          >
            Sign In
          </v-btn>
          <v-btn
            depressed
            color="#1E88E5"
            class="SignUp-btn"
          >
            Sign Up
          </v-btn>
        </v-row>
      </v-col>
    </v-content>
  </v-app>
</template>

<script>
export default {
  methods: {
    signIn () {
      this.$emit('signin')
    }
  }
}
</script>

<style scoped>
    .login-section {
        width: 420px;
    }

    .input-fields {
        width: 300px;
    }

    .login-btn {
        margin-top: 20px;
        left: 0px;
    }

    .SignUp-btn{
        margin-top: 20px;
        margin-left: auto;
    }

    .gender-checkboxes {
        width: 300px;
    }
</style>
