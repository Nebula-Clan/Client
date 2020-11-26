<template>
    <v-container fluid class="py-2 px-0">
        <v-row no-gutters>
            <v-col cols="12">
                <v-card elevation="24">
                    <v-container>
                        <v-card-title>
                            {{ nickname + ' Liked ' +  replyType + ' ' + replyObjectOwnerNickname}}
                        </v-card-title>
                        <v-container>
                            <component :is="comp" v-bind="componentArgument()" class="reply"> </component>
                        </v-container>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import PostReplyComp from './PostReplyComp'
import CommentComp from './CommentComp'

export default {
    props: {
        likedObj: {
            required: true,
            type: Object,
            comp: PostReplyComp
        },
        nickname: {
            required: true,
            type: String
        }
    },
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
    },
    computed: {
        replyType() {
            if (this.likedObj.typeOfLike === 'Post') {
                return 'Post'
            } else {
                return 'Comment'
            }
        },
        replyObjectOwnerNickname() {
            this.reply = this.likedObj.likeReply
            if (this.likedObj.typeOfLike === 'Post') {
                return this.reply.postAuthor
            } else {
                return this.reply.commentOwnerNickname
            }
        }
    },
    created() {
        this.setComponentObject()
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
        setComponentObject() {
            if (this.likedObj.typeOfLike === 'Post') {
                this.comp = PostReplyComp
            } else {
                this.comp = CommentComp
            }
        },
        componentArgument() {
            this.reply = this.likedObj.likeReply
            if (this.likedObj.typeOfLike === 'Post') {
                return {
                    post: this.reply
                }
            } else {
                return {
                    comment: this.reply,
                    isReply: true
                }
            }
        }
    }
}
</script>

<style scoped>

.reply {
    border: 1px white solid;
}
</style>