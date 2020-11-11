<template>
  <v-card>
    <v-card-title>
      People
    </v-card-title>
    <v-card-text>
      <v-list dense rounded>
        <v-subheader>
          <v-icon>mdi-account-multiple</v-icon>
          <span class="ml-1">{{ this.people.length }}</span>
        </v-subheader>
        <v-list-item-group>
          <v-list-item
              class="d-flex align-center"
              v-for="(item, i) in this.people"
              :key="i">
            <v-list-item-content >
              <div class="d-flex">
                <v-avatar size="25" class="mr-2">
                  <img :src="$axios.defaults.baseURL + item.profile_picture" alt="">
                </v-avatar>
                <v-list-item-title>@{{ item.username }}</v-list-item-title>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <br>
      <v-dialog
          v-model="dialog"
          max-width="600px"
          persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-bind="attrs"
              v-on="on"
              color="primary"
              outlined
              small>
            See all
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">People</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-list rounded>
                <v-list-item-group>
                  <v-list-item
                      v-for="(item, i) in this.people"
                      :key="i">
                    <v-list-item-content>
                      <div class="d-flex">
                        <v-avatar size="40" class="mr-2">
                          <img :src="$axios.defaults.baseURL + item.profile_picture" alt="">
                        </v-avatar>
                        <v-list-item-title>@{{ item.username }}</v-list-item-title>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="error"
                outlined
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
  props: ['people'],
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style scoped>

</style>
