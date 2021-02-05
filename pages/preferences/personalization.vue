<template>
  <v-card elevation="2">
    <v-card-title>Personalization</v-card-title>
    <v-card-subtitle>Edit settings for better experience</v-card-subtitle>
    <v-card-text>
      <!-- <v-switch label="Dark Mode" v-model="darkMode" @change="themeChanged">
      </v-switch> -->
      <h3>Available styles</h3>
      <div class="d-flex justify-center my-4">
        <div class="text-center">
          <LightTheme />
          <v-btn @click="changeTheme('light')" outlined class="mt-4" color="primary">Apply</v-btn>
        </div>
        <div class="text-center">
          <DarkTheme />
          <v-btn @click="changeTheme('dark')" class="mt-4" outlined color="primary">Apply</v-btn>
        </div>
      </div>
      <div class="text-center">
        <v-img
          width="350"
          alt=""
          contain
          :src="require('../../static/user-settings/personalization.svg')"
        >
        </v-img>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import LightTheme from "~/components/user-settings/Light-Theme.vue";
import DarkTheme from "~/components/user-settings/Dark-Theme.vue";
export default {
  components: { LightTheme, DarkTheme },
  name: "personalization",
  data() {
    return {
      darkMode: null,
    };
  },
  methods: {
    changeTheme: function (theme) {
      if (theme === 'light') {
        this.$vuetify.theme.dark = false;
        localStorage.setItem("theme", 0);
      } else if (theme === 'dark') {
        this.$vuetify.theme.dark = true;
        localStorage.setItem("theme", 1);
      }
    },
  },
};
</script>

<style scoped>
</style>
