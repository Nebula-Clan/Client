<template>
  <v-card
    v-if="isLoading"
    class="mx-auto pt-2"
    max-width="100%"
    tile>
    <MenuIconLoader :number-of-items="40"/>
  </v-card>
  <v-card
    v-else-if="people.length > 0"
    class="mx-auto pt-4"
    max-width="100%"
    tile>
    <span class="ml-3 text-h4">Accounts</span>
    <v-divider class="mt-4"/>
    <v-list dense>
      <v-list-item-group
        color="primary">
        <v-list-item
          :to="`/profile/${person.username}`"
          class="py-1"
          v-for="(person, i) in people"
          :key="i">
          <v-list-item-avatar>
            <UserAvatar color="primary" :avatar-src="person.profile_picture" :avatar-string="person.username"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-body-1" v-text="person.username"/>
            <v-list-item-title class="mt-1 text-caption" v-text="`${person.first_name}  ${person.last_name}`"/>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
  <NoResult text="user" v-else/>
</template>

<script>
  import UserAvatar from "../shared/UserAvatar";
  import NoResult from "../shared/No-Result";
  import MenuIconLoader from "../homepage/Menu-Icon-Loader";

  export default {
    name: "Explore-People",
    components: { MenuIconLoader, NoResult, UserAvatar },
    props: ['people', 'isLoading'],
  }
</script>

<style scoped>

</style>