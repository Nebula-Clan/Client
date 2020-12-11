<template>
  <v-card class="ma-2 pa-2 item"
          elevation="0"
          outlined
          min-width="400px">
    <v-row>
      <v-col cols="8" class="d-flex">
        <div class="d-flex justify-center align-center">
          <nuxt-link :to="'/community/'+community.name">
            <UserAvatar
              :avatar-src="community.picture"
              :avatar-string="community.name"
              :size="40"
              class="profile-pic"
              color="primary"/>
          </nuxt-link>
          <h2>{{ community.name }}</h2>
        </div>
      </v-col>
      <v-col cols="4" class="d-flex align-center justify-end">
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :loading="loading"
              :color="left? 'accent': 'error'"
              v-bind="attrs"
              v-on="on"
              outlined>
              {{left? 'join': 'leave'}}
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">Leave ?</v-card-title>
            <v-card-text>Are you sure to leave ?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error darken-1" outlined text @click="dialog = false">Cancel</v-btn>
              <v-btn color="accent darken-1" outlined text @click="leave">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import UserAvatar from "~/components/shared/UserAvatar";

export default {
  name: "Community-Item",
  props: ['community'],
  components: {
    UserAvatar
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    leave: function () {
      this.loading = true;
      this.$axios.delete(`api/community/leave_community?name=${this.community.name}`).then(
        () => {
          this["$notifier"].showMessage({content: 'Left!', color: 'success'});
          this.$emit('left');
        }
      ).catch(
        error => this["$notifier"].showMessage({content: error.response.data['error']['message'], color: 'error'})
      ).finally(
        () => this.loading = false
      );
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
