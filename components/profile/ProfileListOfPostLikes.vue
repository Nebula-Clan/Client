<template>
    <v-container fluid>
        <v-card elevation="2">
            <v-row justify="center" align="center">
                <v-card-title class="text-center">
                        12K People Liked this Post
                </v-card-title>
                <v-card-text>
                    <!-- <v-container v-for="item in items" :key="item"> -->
                        <v-virtual-scroll
                            :bench="benched"
                            :items="items"
                            max-height="450"
                            item-height="90"
                        >
                                <template v-slot:default="{ item }">
                                    <v-container>
                                        <v-list-item>
                                            <v-list-item-avatar size="50">
                                                <v-img src="/images/LL1.jpg" >
                                                </v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content class="ml-1">
                                                <v-list-item-title v-text="item"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-container>
                                </template>
                        </v-virtual-scroll>
                    <!-- </v-container> -->
                </v-card-text>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      isLoading: false,
      items: ['shit'],
      model: null,
      search: null,
      tab: null,
    }),
    computed: {
        items () {
        return Array.from({ length: this.length }, (k, v) => v + 1)
        },
        length () {
            return 7000
        },
    },
    mounted() {
        this.isLoading = true

        for (let i = 0; i < 30; i++) {
            this.items.push('fuck' + i)
        }

        this.isLoading = false
    },
  }
</script>

<style scoped>
html { overflow-y: auto }
</style>