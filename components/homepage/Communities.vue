<template>
  <v-card class="elevation-2">
    <v-card-subtitle class="d-flex justify-space-between">
      Communities
      <v-dialog
        v-model="dialog"
        max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            x-small
            icon
            v-bind="attrs"
            v-on="on">
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>
        <CreateCommunity @close="close"/>
      </v-dialog>
    </v-card-subtitle>
    <v-divider class="primary"/>
    <v-list dense>
          <v-list-item-group>
          <nuxt-link
            class="text-decoration-none"
            v-for="(item, i) in communities"
            :key="i"
            :to="'/community/'+item.name">
            <v-list-item>
              <v-list-item-avatar>
                <Avatar :avatarUrl="$axios.defaults.baseURL +item.picture" :substituteChar="item.name[0]"
                        :avatarSize="40"/>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{item.name}} | {{item['members_number']}}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </nuxt-link>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import CreateCommunity from '@/components/community/Create-Community'
import UserAvatar from "../shared/UserAvatar";
export default {
  name: 'communities.component',
  props: ['communities'],
  components: {
    UserAvatar,
    CreateCommunity
  },
  data: () => {
    return {
      dialog: false,
    }
  },
  methods: {
    close() {
      this.dialog = false;
      this.$emit('refresh');
    }
  }
}
</script>

<style scoped>

</style>
