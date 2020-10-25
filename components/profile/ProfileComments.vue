<template>
    <v-container fluid class="py-2">
        <v-row>
            <v-card elevation="24">
                <v-container>
                    <v-card-title>
                        jhon replyed to Lelouch in cominuty fucked up
                    </v-card-title>
                    <v-row>
                        <v-card class="comment mr-7 ml-2" elevation="3">
                            <v-list-item three-line>
                                <v-list-item-avatar size="80">
                                    <v-img src="/images/LL1.jpg">
                                    </v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <div class="overline" style="color:#64FFDA">
                                        Lelouch:
                                    </div>
                                    <div class="overline text--secondary">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus sint reprehenderit sapiente quisquam ad. Iusto officiis vitae assumenda soluta vel?
                                    </div>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </v-row>
                </v-container>
                <v-card-text class="overline text--primary pl-7"> 
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum temporibus labore commodi libero ipsa reprehenderit aliquam laboriosam fugiat exercitationem? Temporibus, dolores delectus. Facilis, fugit sint. Assumenda unde aliquid dolores impedit ex voluptas atque modi, sit harum! Vel voluptatum aliquid possimus.
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn icon class="ml-5">
                        <v-icon>mdi-flag</v-icon>
                    </v-btn>
    
                    <v-btn icon class="ml-auto" :color="likedComment" @click="likeComment">
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
    
                    <v-btn icon class="ml-4">
                        <v-icon>mdi-comment</v-icon>
                    </v-btn>

                    <v-btn icon class="mr-5 ml-4">
                        <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: {
        liked: {
            type: Boolean,
            required: true
        }
    },
    data: () => {
        return {
            like: false,
            dislike: false
        }
    },
    computed: {
        likedComment() {
            if (!this.dislike && (this.liked || this.like)) {
                return 'pink'
            } else {
                return ''
            }
        }
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
        }
    }
}
</script>

<style scoped>

.comment {
    border: 2px white solid;
}

</style>