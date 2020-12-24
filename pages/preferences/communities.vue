<template>
  <v-card>
    <v-card-title>
      My Communities
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-text-field
          v-model="searchKey"
          append-icon="mdi-magnify"
          outlined
          placeholder="Search community"
          type="text"
          @input="search()">
        </v-text-field>
        <div class="d-flex justify-end">
          <v-switch
            v-model="toggle"
            label="Card View">
          </v-switch>
        </div>
      </v-container>

      <v-container v-if="toggle && pageLoaded" class="card-view">
        <CommunityCard
          v-for="c in communitiesToShow"
          :key="c.name"
          :community="c"
          @left="getCommunities"/>
        <div v-if="communitiesToShow.length === 0" class="text-center">
          <v-img :src="require('../../static/user-settings/empty.svg')"
                 alt="empty"
                 contain
                 height="400px"></v-img>
          <h3>It is so quiet here, join into some communities.</h3>
        </div>
      </v-container>

      <v-container v-if="toggle && !pageLoaded" class="card-view">
        <CommunityCardLoader></CommunityCardLoader>
        <CommunityCardLoader></CommunityCardLoader>
        <CommunityCardLoader></CommunityCardLoader>
      </v-container>

      <v-container v-else-if="!toggle && pageLoaded" class="grid-com" fluid>
        <CommunityItem
          v-for="c in communitiesToShow"
          :key="c.name"
          :community="c"
          class="item"
          @left="getCommunities"/>
          <div v-if="communitiesToShow.length === 0" class="text-center">
            <v-img :src="require('../../static/user-settings/empty.svg')"
                   alt="empty"
                   contain
                   height="400px"></v-img>
            <h3>It is so quiet here, join into some communities.</h3>
          </div>
      </v-container>

      <v-container v-else-if="!toggle && !pageLoaded" class="grid-com" fluid>
        <CommunityItemLoader></CommunityItemLoader>
        <CommunityItemLoader></CommunityItemLoader>
      </v-container>

    </v-card-text>
  </v-card>
</template>

<script>
import CommunityCard from '~/components/user-settings/Community-Card'
import CommunityItem from '~/components/user-settings/Community-Item'
import CommunityCardLoader from "~/components/user-settings/Community-Card-Loader";
import CommunityItemLoader from "~/components/user-settings/Community-Item-Loader";

export default {
  name: "UserCommunities",
  components: {CommunityItemLoader, CommunityCardLoader, CommunityItem, CommunityCard},
  data() {
    return {
      pageLoaded: false,
      toggle: true,
      searchKey: null,
      communities: [],
      communitiesToShow: []
    }
  },
  methods: {
    getCommunities: function () {
      this.pageLoaded = false;
      this.$axios.get('api/community/user_communities').then(
        ({data}) => {
          this.communities = data.communities;
          this.communitiesToShow = data.communities;
          this.pageLoaded = true;
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
.card-view {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.grid-com {
  .item {
    flex: 1;
  }

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
