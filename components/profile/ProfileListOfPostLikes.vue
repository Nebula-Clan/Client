<template>
    <v-container fluid>
        <v-card elevation="2">
            <v-row justify="center" align="center">
                    <v-card-title class="text-center">
                            12K People Liked this Post
                    </v-card-title>
                <v-card-text>
                    <v-divider></v-divider>
                    <v-virtual-scroll
                        :bench="10"
                        :items="items"
                        max-height="450"
                        item-height="90"
                        class="px-15"
                    >
                            <template v-slot:default="{ item }">
                                <v-container>
                                    <v-list-item :class="{ followers: item.isFollower }">
                                        <v-list-item-avatar size="50">
                                            <v-img src="/images/LL1.jpg" >
                                            <template v-slot:placeholder>
                                                <v-row
                                                class="fill-height ma-0"
                                                align="center"
                                                justify="center"
                                                >
                                                <v-progress-circular
                                                    indeterminate
                                                    color="grey lighten-5"
                                                ></v-progress-circular>
                                                </v-row>
                                            </template>
                                            </v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content class="ml-1">
                                            <v-list-item-title v-text="item.name"></v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-btn v-if="!item.isFollower" class="px-5" color="primary" small> Follow </v-btn>
                                            <v-btn v-else color="error" small outlined> Unfollow </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-container>
                            </template>
                    </v-virtual-scroll>
                </v-card-text>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      isLoading: false,
      items: [],
      model: null,
      search: null,
      tab: null,
      index: 0,
      isActive: false
    }),
    computed: {
        length () {
            return 7000
        }
    },
    methods: {
        increase() {
            for (let i = 0; i < 2; i++) {
                if (i < 3){
                this.items.push({'name' : 'per' + i, 'isFollower' : true})
                } else {
                    this.items.push({'name' : 'per' + i, 'isFollower' : false})
                }
            }
        }
    },
    mounted() {
        this.isLoading = true

        this.increase()

        this.isLoading = false
    },
  }
</script>

<style scoped>
::-webkit-scrollbar { width: 8px; height: 3px;}
::-webkit-scrollbar-button {  background-color: #666; }
::-webkit-scrollbar-track {  background-color: #646464;}
::-webkit-scrollbar-track-piece { background-color: #000;}
::-webkit-scrollbar-thumb { height: 50px; background-color: #666; border-radius: 3px;}
::-webkit-scrollbar-corner { background-color: #646464;}
::-webkit-resizer { background-color: #666;}

.followers {
    /* #6daddb */
    /* 537895 */
    /* 485563 */
    /* 2b5876  */
/* background-image: linear-gradient(315deg, rgba(0, 0, 0, 0) 72%,#537895 );
border-top-left-radius: 25px; */
}
</style>