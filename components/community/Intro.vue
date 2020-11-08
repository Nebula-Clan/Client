<template>
  <div>
    <v-row>
      <img class="header-image" :src="headerImage">
    </v-row>
    <v-row class="logo elevation-2">
      <v-col class="d-flex align-center">
        <div class="d-flex align-center ml-10">
          <div class="mr-2">
            <v-icon color="primary">mdi-calendar</v-icon>
            <span class="primary--text">2020-11-06</span>
          </div>
          <div class="ml-2">
            <v-icon color="primary">mdi-account</v-icon>
            <span class="primary--text">150</span>
          </div>
        </div>
      </v-col>
      <v-col class="text-center d-flex justify-center">
        <v-avatar class="avatar" size="150">
          <img :src="logo">
        </v-avatar>
        <h1>{{ name }}</h1>
      </v-col>
      <v-col class="d-flex justify-end align-center">
        <v-btn
          outlined
          class="mr-10"
          :loading="loading"
          :disabled="loading"
          color="primary"
          @click="loader = 'loading'">
          <v-icon class="mr-2">mdi-account-plus</v-icon>
          <span>Join</span>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Intro",
  props: ['headerImage', 'logo', 'name'],
  data() {
    return {
      loader: null,
      loading: false
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },
}
</script>

<style lang="scss" scoped>
.header-image {
  width: 100%;
  height: 300px;
}
.logo {
  background-color: #23241f;
  height: 100px;
  position: relative;
  .avatar {
    border: 1px solid #dddd;
    background-color: #23241f;
    border-radius: 50%;
    position: absolute;
    top: -120px;
    left: calc(50% - 75px);
  }
  h1 {
    position: absolute;
    bottom: 10px;
  }
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
