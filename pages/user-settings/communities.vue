<template>
  <v-card>
    <v-card-title>
      My Communities
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-text-field
          outlined
          type="text"
          @input="search()"
          placeholder="Search community"
          append-icon="mdi-magnify"
          v-model="searchKey">
        </v-text-field>
        <v-switch
          v-model="toggle"
          label="Card View"
        ></v-switch>
      </v-container>

      <v-container v-if="toggle" class="d-flex">
      <CommunityCard
        :community="c"
        v-for="c in communitiesToShow"
        :key="c.name" />
      </v-container>
      <v-container fluid v-else class="grid-com">
        <CommunityItem
          class="item"
          :community="c"
          v-for="c in communitiesToShow"
          :key="c.name" />
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import CommunityCard from '~/components/user-settings/Community-Card'
import CommunityItem from '~/components/user-settings/Community-Item'
export default {
  name: "UserCommunities",
  components: {CommunityItem, CommunityCard},
  data() {
    return {
      toggle: true,
      searchKey: null,
      communities: [],
      communitiesToShow: []
    }
  },
  methods: {
    getCommunities: function () {
      this.$axios.get('api/community/user_communities').then(
        ({data}) => {
          this.communities = data.communities;
          this.communitiesToShow = data.communities;
        }
      ).catch(e => this['notifier'].showMessage({content: e.response.data['error']['message'], color: 'error'}));
    },
    search: function () {
      this.communitiesToShow = this.communities.filter(c => c.name.toLowerCase().includes(this.searchKey.toLowerCase()));
    }
  },
  mounted() {
    this.getCommunities();
  }
}
</script>

<style lang="scss" scoped>
  .grid-com {
    .item {
      flex: 1;
    }
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
