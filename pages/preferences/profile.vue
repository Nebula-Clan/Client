<template>
  <v-card>
    <v-card-title>
      Edit Your Profile
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <ProfileInfo />
        </v-col>
        <v-divider class="mx-10"/>
        <v-col cols="12">
          <ChangePassword />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import ProfileInfo from "~/components/user-settings/Profile-info"
import ChangePassword from "~/components/user-settings/Change-Password"
export default {
  name: "profile",
  components: {ChangePassword, ProfileInfo},
}
</script>

<style lang="scss" scoped>
</style>
