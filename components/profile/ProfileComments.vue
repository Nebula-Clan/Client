<template>
    <v-container fluid>
        <v-row>
            <v-card max-width="740">
                <v-list-item three-line>
                     <v-list-item-avatar tile size="80" color="grey">
                        <v-list-item-icon>
                            <v-icon >mdi-account</v-icon>
                        </v-list-item-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <div class="overline mb-3">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus sint reprehenderit sapiente quisquam ad. Iusto officiis vitae assumenda soluta vel?
                        </div>
                        <v-list-item-subtitle>
                            <v-row class="ml-1">
                                <p v-for="hashtag in hashtags" :key="hashtag" class="mx-1 blue--text text--lighten-1">
                                    {{ hashtag }}
                                </p>
                            </v-row>
                            <v-row>
                                <v-list-item-icon class="ml-3">
                                    <v-icon>mdi-flag</v-icon>
                                </v-list-item-icon>
                                <v-list-item-icon class="ml-3">
                                    <v-icon>mdi-like</v-icon>
                                </v-list-item-icon>
                                <v-list-item-icon class="ml-3">
                                    <v-icon>mdi-like</v-icon>
                                </v-list-item-icon>
                            </v-row>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </v-row>
    </v-container>
</template>


<script>
export default {
    data: () => {
        return {
            hashtags: [
                "#idk",
                "#idc",
                "#hallo",
                "#test",
                "#foo",
                "#bar",
                "#barbar",
                "#bitch",
                '#goaway'
            ]
        }
    }
}
</script>

<style scoped>

</style>