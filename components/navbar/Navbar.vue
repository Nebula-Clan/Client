<template>
  <v-app-bar app color="primary darken-4" dark elevate-on-scroll >
    <v-row v-if="$auth.user" class="align-center toolbar px-4">
      <v-col cols="2" md="4" class="search-col">
        <v-menu
          v-if="$vuetify.breakpoint.xsOnly"
          :close-on-content-click="false"
          offset-y
          transition="slide-x-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on">
              <v-icon>
                mdi-magnify
              </v-icon>
            </v-btn>
          </template>
          <v-list class="pa-2">
            <v-text-field
              hide-details
              placeholder="hashtags, people, etc..."
              outlined
              v-model="searchKey"
              @click:append="search"
              append-icon="mdi-magnify"
              dense>
            </v-text-field>
          </v-list>
        </v-menu>
        <v-text-field
          style="width: max-content"
          class="search"
          v-model="searchKey"
          outlined
          placeholder="Search ..."
          dense
          @click:append="search"
          hide-details
          append-icon="mdi-magnify">
        </v-text-field>
      </v-col>
      <v-col cols="5" md="4" class="text-center">
        <nuxt-link to="/feed"
                   style="width: min-content"
                   class="text-decoration-none white--text">
          <v-toolbar-title>Huddle</v-toolbar-title>
        </nuxt-link>
      </v-col>
      <v-col cols="5" md="4" class="d-flex nav-action justify-end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="nav-btn"
              to="/explore"
              icon
              dark
              v-bind="attrs"
              v-on="on">
              <v-icon>mdi-compass</v-icon>
            </v-btn>
          </template>
          <span>Explore</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="nav-btn"
              to="/my-chats"
              icon
              dark
              :ripple="true"
              v-bind="attrs"
              v-on="on">
              <v-icon>mdi-message</v-icon>
            </v-btn>
          </template>
          <span>Messages</span>
        </v-tooltip>
        <v-menu offset-y transition="slide-x-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="nav-btn"
              icon
              v-bind="attrs"
              v-on="on">
              <UserAvatar size="35px" :avatar-src="$auth.user.profile_picture"/>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item :to="'/profile/'+$auth.user.username">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>My Profile</v-list-item-title>
            </v-list-item>
            <v-list-item to="/preferences">
              <v-list-item-icon>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Preferences</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row v-else class="align-center toolbar px-4">
      <v-toolbar-title>Huddle</v-toolbar-title>
      <v-spacer/>
      <v-btn icon to="/login">
        <v-icon>
          mdi-login
        </v-icon>
      </v-btn>
      <v-btn icon to="/signup">
        <v-icon>
          mdi-account-plus
        </v-icon>
      </v-btn>
    </v-row>
  </v-app-bar>
</template>

<script>
import UserAvatar from "~/components/shared/UserAvatar";
export default {
  name: "Navbar",
  components: {UserAvatar},
  data() {
    return {
      searchKey: null
    }
  },
  methods: {
    logout() {
      this.$auth.logout();
      this.$notifier.showMessage({content: "Logout", color: 'error'});
      this.$auth.redirect('login');
      this.$forceUpdate();
    },
    getProfileInfo: function () {
    },
    search: function () {
      this.$router.push({path: '/explore', query: {keyword: this.searchKey}});
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar {
  .nav-btn {
    margin: 0 8px 0 8px;
  }
}
@media screen and (max-width: 576px) {
  .toolbar {
    padding: 0;
    .search{
      display: none;
    }
    .nav-btn {
      margin: unset;
    }
  }
}
</style>
