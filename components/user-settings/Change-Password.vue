<template>
  <v-form v-model="formValid" @submit.prevent="setPassword">
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
      <v-col cols="12" class="text-right">
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
      loading: false,
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
    setPassword: function() {
      const formData = new FormData();
      formData.append('password', this.password.newPassword);
      this.$axios.put('api/profile/update_profile', formData).then(
        () => this["$notifier"].showMessage({ content: 'Password updated successfully', color: 'success' })
      ).catch(
        error =>
          this["$notifier"].showMessage({content: error.response.data['error']['message'], color: 'error'})
      );
    },
  }
}
</script>

<style scoped>

</style>
