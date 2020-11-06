<template>
  <v-card>
    <v-card-title>
      People
    </v-card-title>
    <v-card-text>
      <v-list rounded>
        <v-subheader>
          <v-icon>mdi-account-multiple</v-icon>
          <span class="ml-1">150</span>
        </v-subheader>
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in [1,2,3,4,5,6,7,8,9,10]"
            :key="i">
            <v-list-item-icon>
              <v-avatar size="20">
                <img src="https://seeklogo.com/images/V/vuetify-logo-3BCF73C928-seeklogo.com.png" alt="">
              </v-avatar>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>amiresm</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-btn
        color="primary"
        outlined
        small>View more</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "People"
}
</script>

<style scoped>

</style>
