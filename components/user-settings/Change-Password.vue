<template>
  <v-form v-model="formValid" @submit.prevent="submit">
    <v-row>
      <v-col>
        <v-text-field
          v-model="password.currentPassword"
          :rules="rules"
          counter
          label="Current Password"
          outlined>
        </v-text-field>
        <v-text-field
          v-model="password.newPassword"
          :rules="rules"
          counter
          label="New Password"
          outlined>
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="password.repeatNewPassword"
          :rules="confirmPasswordRules"
          counter
          label="Repeat Password"
          outlined>
        </v-text-field>
      </v-col>
      <v-col cols="12">
        <v-btn
          type="submit"
          :disabled="!formValid"
          color="accent"
          outlined>
          Apply changes
        </v-btn>
      </v-col>
    </v-row>
  </v-form>

</template>

<script>
export default {
  name: "Change-Password",
  data() {
    return {
      formValid: false,
      password: {
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      },
      rules: [
        t => !!t || 'This field cannot be empty',
        t => t.length >= 8 || 'Password must be at least 8 characters or more'
      ],
      confirmPasswordRules: [
        t => !!t || 'This field cannot be empty',
        t => t.length >= 8 || 'Password must be at least 8 characters or more',
        t => t === this.password.newPassword || 'Provided password does not match'
      ]
    }
  },
  methods: {
    submit: function () {

    }
  }
}
</script>

<style scoped>

</style>
