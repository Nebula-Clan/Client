<template>
  <div>
    <v-row class="header-image">
      <img v-if="data.banner !== '/media/null'" :src="$axios.defaults.baseURL + data.banner">
    </v-row>
    <v-row class="logo elevation-2">
      <v-col class="d-flex align-center">
        <div class="d-flex align-center ml-10">
          <div class="mr-2 d-flex align-center">
            <v-icon color="primary">mdi-calendar</v-icon>
            <span style="font-size: small" class="primary--text">{{getDate()}}</span>
          </div>
          <div class="ml-2 d-flex align-center">
            <v-icon color="primary">mdi-account</v-icon>
            <span style="font-size: small" class="primary--text">{{ data.members }}</span>
          </div>
        </div>
      </v-col>
      <v-col class="text-center d-flex justify-center">
        <v-avatar class="avatar" size="150">
          <img :src="$axios.defaults.baseURL + data.logo">
        </v-avatar>
        <h1>{{ data.name }}</h1>
      </v-col>
      <v-col class="d-flex justify-end align-center">
        <v-btn
          outlined
          class="mr-10"
          :loading="loading"
          :disabled="loading"
          color="primary"
          @click="userState">
          <v-icon v-if="!userJoined" class="mr-2">mdi-account-plus</v-icon>
          <v-icon v-else class="mr-2">mdi-account-minus</v-icon>
          <span v-if="!userJoined">Join</span>
          <span v-else>Leave</span>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import {dateStandard} from '@/shared-functions/community/community'

  export default {
    name: "Intro",
    props: ['data', 'userJoined'],
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      userState() {
        this.loading = !this.loading;
        if (this.userJoined) {
          this.leave()
        } else {
          this.join()
        }
      },
      join() {
        this.$axios.post(`api/community/join_community?name=${this.data.name}`).then(
          () => {
            this.$emit('userState');
            this.loading = !this.loading;
          }
        ).catch();
      },
      leave() {
        this.$axios.$delete(`api/community/leave_community?name=${this.data.name}`).then(
          () => {
            this.$emit('userState');
            this.loading = !this.loading;
          }
        ).catch();
      },
      getDate() {
        return dateStandard(this.data.since);
      }
    },
    watch: {},
    mounted() {
      console.log(this.data.banner)
    }
  }
</script>

<style lang="scss" scoped>
  .header-image {
    height: 300px;

    img {
      width: 100%;
      height: 300px;
    }
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
