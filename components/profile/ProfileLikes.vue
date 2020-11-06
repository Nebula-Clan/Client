<template>
    <v-container fluid class="py-2">
        <v-row ref="VCardParent">
            <v-card elevation="24" :min-width="postWidth">
                <v-container>
                    <v-card-title>
                        {{ likedObj.getLikeOwnerUsername() }} <v-icon class="mx-1" color="red lighten-1">mdi-heart</v-icon> post ahmad in community zed
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
        </v-row>
    </v-container>
</template>


<script>
export default {
    props: {
        likedObj: {
            required: true,
            type: Object
        }
    },
    data: () => {
        return {
            vCardWidth: '0',
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
            ],
            isMounted: false,
            hack: 0
        }
    },
    computed: {
        postWidth() {
            this.hack
            if (!this.isMounted) {
                return;
            }
            return this.$refs.VCardParent.clientWidth
        }
    },
    mounted() {
        this.vCardWidth =  this.$refs.VCardParent.clientWidth
        this.isMounted = true
        window.addEventListener('resize', this.hackWidth, { passive: true })
        this.hackWidth()
    },
    methods: {
        likeComment() {
            if (!this.like) {
                this.like = true
                this.dislike = false
            } else {
                this.like = false
                this.dislike = true
            }
        },
        hackWidth() {
            this.hack++
        }
    }
}
</script>

<style scoped>

.post {
    border: 2px white solid;
}
</style>