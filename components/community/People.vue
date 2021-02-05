<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">
        mdi-account-multiple
      </v-icon>
      People
    </v-card-title>
    <v-card-text>
      <v-list dense rounded>
        <v-list-item-group>
          <v-list-item
            :to="'/profile/' + item.username"
            v-for="(item, i) in this.people"
            :key="i"
            class="d-flex align-center">
            <v-list-item-content>
              <div class="d-flex align-center">
                <UserAvatar
                  color="primary"
                  :avatar-string="item.username"
                  :avatar-src="item.profile_picture"/>
                <v-list-item-title>
                  <b>{{ item.username }}</b>
                  <br>
                  <span style="font-size: xx-small">{{item.first_name }} {{item.last_name}}</span>
                </v-list-item-title>
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
            v-if="people.length > 15"
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
                        <v-avatar class="mr-2" size="40">
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
import UserAvatar from "../shared/UserAvatar";
export default {
  name: "People",
  components: { UserAvatar },
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
