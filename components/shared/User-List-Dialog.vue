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
          <nuxt-link :to="`/profile/${user.username}`" class="text-decoration-none">
            {{user.username}}
          </nuxt-link>
          <v-spacer/>
          <v-btn
            width="100"
            outlined
            v-if="isNotCurrentUser(user.username)"
            class="text-body-2 mr-4"
            :color="user.followed_by_viewer ? 'red' : 'accent'">
            {{user.followed_by_viewer ? "Unfollow" : "Follow"}}
          </v-btn>
          <div v-else class="text-header-4 text-center mr-14">You</div>
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
        methods: {
            isNotCurrentUser(username) {
                return this.$auth.user.username !== username;
            }
        },
        props: ['title', 'isDialogEnabled', 'userList', 'closeFunc']
    }
</script>

<style scoped>

</style>
