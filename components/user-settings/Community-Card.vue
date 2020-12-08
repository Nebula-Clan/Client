<template>
  <v-card
    elevation="0"
    max-width="300px"
    height="400px" class="card ma-2">
    <div class="profile mb-10">
      <v-img
        :src="this.$axios.defaults.baseURL + community.banner_picture"
        class="white--text align-end custom-rounded"
        height="120px">
      </v-img>
      <nuxt-link :to="'/community/'+community.name">
        <UserAvatar
          :avatar-src="community.picture"
          :avatar-string="community.name"
          :size="80"
          class="profile-pic"
          color="primary"/>
      </nuxt-link>
    </div>
    <v-card-text class="text-center pa-1">
      <h2>{{ community.name }}</h2>
    </v-card-text>
    <v-card-text class="text-center about">
      {{ community.about.substr(0, 200) }}
      <span v-if="community.about.substr(0, 200)!==community.about">...</span>
    </v-card-text>
    <v-card-actions class="actions">
      <v-btn
        :loading="loading"
        :color="left? 'accent': 'error'"
        @click="left? join(): leave()"
        outlined>
        {{left? 'join': 'leave'}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import UserAvatar from "~/components/shared/UserAvatar";
export default {
  name: "Community-Card",
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
.card {
  border: 1px solid #4b4b4b;
  position: relative;
  .actions {
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
  }
  .about {
    font-size: small;
  }
}
.profile {
  position: relative;

  .profile-pic {
    position: absolute;
    bottom: -40px;
    left: calc(50% - 56px);
  }

  .custom-rounded {
    border-radius: 5px 5px 0 0;
  }
}

b, span {
  font-size: x-small;
}
</style>
