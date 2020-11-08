<template>
  <v-card>
    <v-card-title>
      People
    </v-card-title>
    <v-card-text>
      <v-list rounded dense>
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
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            color="primary"
            v-bind="attrs"
            small
            v-on="on">
            See all
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">People in this community</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <h1>Hello</h1>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              outlined
              color="error"
              text
              @click="dialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "People",
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style scoped>

</style>
