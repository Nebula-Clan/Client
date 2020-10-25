<template>
    <v-container fluid class="py-2">
        <v-card elevation="24">
            <v-container>
                <v-card-title>
                    jhon <v-icon class="mx-1" color="red lighten-1">mdi-heart</v-icon> post ahmad in community zed
                </v-card-title>
                <v-row>
                    <v-card class="post mr-7 ml-2">
                        <v-list-item three-line>
                            <v-list-item-avatar tile size="80" color="grey">
                                    <v-img src="/images/Back3.jpg"></v-img>
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
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-row>
            </v-container>
        </v-card>
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
                "#loca",
                '#toca'
            ]
        }
    }
}
</script>

<style scoped>

.post {
    border: 2px white solid;
}
</style>