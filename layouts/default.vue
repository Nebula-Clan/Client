<template>
  <v-app dark>
    <Navbar />
    <v-main >
      <nuxt></nuxt>
      <Snackbar/>
      <GoUpFAB/>
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from '~/components/shared/Snackbar.vue'
import GoUpFAB from "@/components/shared/GoUpFAB";
import Avatar from "~/components/shared/Avatar";
import UserAvatar from "~/components/shared/UserAvatar";
import Navbar from "~/components/navbar/Navbar";

export default {
  components: {Navbar, UserAvatar, Avatar, GoUpFAB, Snackbar},
  created() {
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: ''
    }
  },
  methods: {
  }
}
</script>


<style lang="scss" scoped>
</style>
