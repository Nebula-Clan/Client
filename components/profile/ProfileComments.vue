<template>
    <v-container fluid class="py-2">
        <v-row ref="VCardParent">
            <v-card elevation="24" :min-width="postWidth" :id="commentID">
                <v-card-title>
                    <v-menu>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on" class="ml-auto">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list elevation="24">
                            <v-list-item>
                                <v-list-item-title style="cursor: pointer" @click="reportOverlay = !reportOverlay">Report</v-list-item-title >
                                <v-icon style="cursor: pointer">mdi-flag</v-icon>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title style="cursor: pointer" @click="showListOfLikes">ListOfLikes</v-list-item-title >
                                <v-icon>mdi-heart</v-icon>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title style="cursor: pointer" >Share</v-list-item-title>
                                <v-icon style="cursor: pointer">mdi-share-variant</v-icon>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <v-overlay
                    :z-index="zIndex"
                    :value="reportOverlay"
                    opacity="0.8"
                    >
                        <ProfileReport @cancel="reportOverlay = !reportOverlay" />
                    </v-overlay>

                    <v-overlay
                    :z-index="zIndex"
                    :value="likesOverlay"
                    opacity="0.8"
                    >
                        <OverlayListOfProfile @cancel="likesOverlay = !likesOverlay" :profiles="listOfProfileLikedPost" />
                    </v-overlay>
                </v-card-title>
                <v-container>
                    <component :is="comp" v-bind="componentArgument()" :isReply="true" class="comment"></component>
                </v-container>
                <!-- <CommentComp :comment="comment" :isReply="like" /> -->
                <v-card-text>
                    {{ comment.commentBody }}
                    <!-- Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error repudiandae laborum officiis repellendus dicta delectus minima provident nulla? Omnis, dolor! Voluptatum perferendis quibusdam eaque sed, sit at! Eius adipisci reiciendis in rem placeat veniam at enim, obcaecati ducimus, autem minima cupiditate delectus magnam maiores iste nemo omnis quasi error hic excepturi! Ipsa, earum. Voluptate quisquam ratione suscipit ipsam! Mollitia, voluptate. -->
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
    
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
import CommentComp from './CommentComp'
import PostReplyComp from './PostReplyComp'
import OverlayListOfProfile from './OverlayListOfProfile'

import { mapActions } from 'vuex'

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
            reportOverlay: false,
            likesOverlay: false,
            zIndex: 99,
            vCardWidth: '0',
            isMounted: false,
            hack: 0,
            comp: CommentComp,
            reply: '',
            listOfProfileLikedPost: []
        }
    },
    computed: {
        likedComment() {
            if (!this.dislike && (this.comment.isLiked || this.like)) {
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
            if (this.comp == CommentComp) {
                return `${this.comment.commentOwnerUsername} has commented on comment ${this.reply.commentOwnerUsername}`
            } else {
                return `${this.comment.commentOwnerUsername} has commented on Post ${this.reply.postAuthor}`
            }
        },
        postWidth() {
            this.hack
            if (!this.isMounted) {
                return;
            }
            return this.$refs.VCardParent.clientWidth
        },
        commentID() {
            if (this.comment.commentID) {
                return this.comment.commentID
            }
            return 1
        }
    },
    created() {
        this.setComponentObject()
    },
    mounted() {
        if (this.comment.isLiked) {
            this.like = this.comment.isLiked
        }
        this.vCardWidth =  this.$refs.VCardParent.clientWidth
        this.isMounted = true
        window.addEventListener('resize', this.hackWidth, { passive: true })
        this.hackWidth()
    },
    methods: {
        ...mapActions('modules/profile/profileLikes', ['submitLikeAtCommentWithID', 'deleteLikeAtCommentWithID']),
        ...mapActions('modules/profile/profileLikes', ['getProfilesThatLikedCommentByID']),
        showListOfLikes() {
            this.getProfilesThatLikedCommentByID(this.comment.commentID)
            .then((res) => {
                console.log(res)
                this.listOfProfileLikedPost = res
                this.likesOverlay = !this.likesOverlay
            })
            .catch((error) => {
                console.log(error)
            })
        },
        likeComment() {
            if (!this.like) {
                this.submitLikeAtCommentWithID(this.comment.commentID)
                .then(({ data }) => {
                    this.like = true
                    this.dislike = false
                })
                .catch((error) => {
                    if (error.response.status == 403) {
                        this.showErrorWithMessage('Please Login in or Sign Up')
                    }
                })
            } else {
                this.deleteLikeAtCommentWithID(this.comment.commentID)
                .then(({ data }) => {
                    this.like = false
                    this.dislike = true
                })
                .catch((error) => {
                    if (error.response.status == 403) {
                        this.showErrorWithMessage('Please Login in or Sign Up')
                    }
                })
            }
        },
        hackWidth() {
            this.hack++
        },
        setComponentObject() {
            if (this.comment.commentTypeOfReply === 'Post') {
                this.comp = PostReplyComp
            } else {
                this.comp = CommentComp
            }
        },
        componentArgument() {
            this.reply = this.comment.commentReply
            if (this.comment.commentTypeOfReply === 'Post') {
                return {
                    post: this.reply
                }
            } else {
                return {
                    comment: this.reply
                }
            }
        },
        showErrorWithMessage(message) {
            this.$notifier.showMessage({content: message, color: 'error'});
        }
    }
}
</script>

<style scoped>

.comment {
    border: 1px white solid;
    border-radius: 5px;
}

</style>
