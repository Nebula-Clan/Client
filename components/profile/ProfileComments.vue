<template>
    <v-container fluid class="py-2">
        <v-row ref="VCardParent">
            <v-card elevation="24" :min-width="postWidth">
                <v-card-title>
                    shit
                </v-card-title>
                <v-card-text class="overline text--primary pl-7"> 
                    {{ comment.getCommentBody }}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-menu>
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                        </template>
                        <v-list elevation="24">
                            <v-list-item>
                                <v-list-item-title style="cursor: pointer" @click="overlay = !overlay">Report</v-list-item-title >
                                <v-icon style="cursor: pointer">mdi-flag</v-icon>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title style="cursor: pointer" >Share</v-list-item-title>
                                <v-icon style="cursor: pointer">mdi-share-variant</v-icon>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <v-overlay
                    :z-index="zIndex"
                    :value="overlay"
                    opacity="0.8"
                    >
                        <ProfileReport @cancel="overlay = !overlay" />
                    </v-overlay>
    
                    <v-btn icon class="ml-auto" :color="likedComment" @click="likeComment">
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>

                    <v-btn icon class="mr-5 ml-4">
                        <v-icon>mdi-comment</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    data: () => {
        return {
            like: false,
            dislike: false,
            overlay: false,
            zIndex: 1,
            vCardWidth: '0',
            isMounted: false,
            hack: 0
        }
    },
    computed: {
        likedComment() {
            if (!this.dislike && (this.comment.liked || this.like)) {
                return 'pink'
            } else {
                return ''
            }
        },
        isReply() {
            if (this.comment.isReply()) {
                return true
            }
            return false
        },
        commentTitle() {
            return 'Some Comment'
        },
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

.comment {
    border: 2px white solid;
}

</style>
