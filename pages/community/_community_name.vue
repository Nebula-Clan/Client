<template>
  <div>
    <Intro :logo="logo" :name="name" :header-image="headerImage"/>
    <v-row class="pa-5">
      <v-col cols="3">
        <People />
      </v-col>
      <v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Intro from "@/components/community/Intro";
import People from "@/components/community/People";
import PostQuickView from '@/components/homepage/Post-quick-view'
export default {
  name: "communityName",
  components: {
    People,
    Intro,
    PostQuickView
  },
  data() {
    return {
      headerImage: 'https://www.delawaregreenways.org/wp-content/uploads/2020/05/nature-header.jpg',
      logo: 'https://seeklogo.com/images/V/vuetify-logo-3BCF73C928-seeklogo.com.png',
      name: 'Vuetify'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
