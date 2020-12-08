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
        <v-btn
          class="mr-2"
          :color="left? 'accent': 'error'"
          :loading="loading"
          outlined
          @click="left? join(): leave()">
          {{ left ? 'join' : 'leave' }}
        </v-btn>
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
      left: false,
    }
  },
  methods: {
    leave: function () {
      this.loading = true;
      this.$axios.delete(`api/community/leave_community?name=${this.community.name}`).then(
        () => {
          this.left = true;
          this["$notifier"].showMessage({content: 'Left!', color: 'success'});
        }
      ).catch(
        error => this["$notifier"].showMessage({content: error.response.data['error']['message'], color: 'error'})
      ).finally(
        () => this.loading = false
      );
    },
    join: function () {
      this.loading = true;
      this.$axios.post(`api/community/join_community?name=${this.community.name}`).then(
        () => {
          this.left = false;
          this["$notifier"].showMessage({content: 'Joined', color: 'success'});
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
