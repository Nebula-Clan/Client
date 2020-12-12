<template>
  <v-dialog
    persistent
    v-model="isDialogEnabled"
    scrollable
    max-width="450px">
    <v-card>
      <v-card-title>{{title}}</v-card-title>
      <v-divider class="my-2"/>
      <v-card-text style="max-height: 400px">

        <v-row v-for="user in userList" align="center" justify="center" class="my-2">
          <UserAvatar
            size="50"
            color="primary"
            avatar-string="H"
            :avatar-src="user.profile_picture"/>
          <span class="text-body-1">{{user.username}}</span>
          <v-spacer/>
<!--          <v-btn-->
<!--            outlined-->
<!--            v-if="this.$route.params.username !== this.$auth.user.username"-->
<!--            class="mr-4"-->
<!--            color="primary">-->
<!--            {{isFollowing ? "Unfollow" : "Follow"}}-->
<!--          </v-btn>-->
        </v-row>

      </v-card-text>
      <v-card-actions>
        <v-btn
          outlined
          color="primary"
          text
          @click="closeFunc">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import UserAvatar from "./UserAvatar";

  export default {
    name: "ListDialog",
    components: { UserAvatar },
    props: ['title', 'isDialogEnabled', 'userList', 'closeFunc']
  }
</script>

<style scoped>

</style>
