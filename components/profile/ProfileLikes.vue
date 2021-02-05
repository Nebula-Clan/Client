<template>
    <v-container fluid class="py-2">
        <v-row ref="VCardParent">
            <v-card elevation="2" :min-width="postWidth">
                <v-container>
                    <v-card-title>
                        {{ nickname + ' Liked ' +  replyType + ' ' + replyObjectOwnerNickname}}
                    </v-card-title>
                    <v-container>
                        <component :is="comp" v-bind="componentArgument()" class="reply"> </component>
                    </v-container>
                </v-container>
            </v-card>
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
        },
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