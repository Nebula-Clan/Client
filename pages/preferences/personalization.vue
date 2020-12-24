<template>
  <v-card elevation="2">
    <v-card-title>Personalization</v-card-title>
    <v-card-subtitle>Edit settings for better experience</v-card-subtitle>
    <v-card-text>
      <v-switch label="Dark Mode" v-model="darkMode" @change="themeChanged">
      </v-switch>
      <div class="text-center">
        <v-img
          width="350"
          alt=""
          contain
          :src="require('../../static/user-settings/personalization.svg')">
        </v-img>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "personalization",
  data(){
    return {
      darkMode: null,
    }
  },
  methods: {
    themeChanged: function (event) {
      console.log(event);
      let value;
      if (event) {
        value = '1';
      } else {
        value = '0';
      }
      localStorage.setItem('dark', value);
      this.$vuetify.theme.dark = event;
    }
  },
  mounted() {
    this.darkMode = this.$vuetify.theme.dark
  }
}
</script>

<style scoped>

</style>
