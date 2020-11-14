<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
        <div v-if="this.$auth.user" class="d-flex align-center">
          <v-row align="center"
                 justify="center">
            <v-btn
              @click="logout"
              color="error"
              class="mt-5">logout</v-btn>
          </v-row>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <nuxt/>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import * as storage from "core-js";

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Feed',
          to: '/feed'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Sign In',
          to: '/login'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Sign Up',
          to: '/signup'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Create Post',
          to: '/new-post'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Profile',
          to: '/profile/had0007'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Complete PostView',
          to: '/posts/1/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Django Community',
          to: '/community/Django'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods: {
    logout(){
      this.$auth.logout();
      this.$auth.redirect('login')
    }
  }
}
</script>
