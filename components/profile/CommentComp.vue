<template>
    <v-list-item three-line @click="expanded = !expanded" class="cursor">
        <v-list-item-avatar v-if="isReply" size="80">
            <v-img src="/images/LL1.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <div class="overline mb-0" v-if="isReply">
                {{ comment.commentOwnerUsername + ':' }}
            </div>
            <v-list-item-subtitle :class="getExpandClass">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus laborum excepturi omnis aut nesciunt temporibus soluta voluptatibus dolor expedita eum laboriosam quam dicta eligendi cumque doloremque fugit cum harum provident consectetur, optio aspernatur. Minima voluptates magni voluptatibus nulla magnam ratione vitae fuga ipsum maiores praesentium quae, ex eligendi. Quo laudantium accusantium laborum, nihil earum totam reiciendis fuga voluptate cum quam.
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>


<script>
export default {
    props: {
        isReply: {
            type: Boolean,
            required: true
        },
        comment: {
            type: Object,
            required: true
        }
    },
    data: () => {
        return {
            expanded: false
        }
    },
    computed: {
        getCommentImage() {
            return ''
        },
        getExpandClass() {
            if (this.expanded) {
                return 'expand'
            } else {
                return 'de-expand'
            }
        }
    }
}
</script>


<style scoped>

.comment-author {
    text-transform: none !important;
}

.cursor {
    cursor: context-menu;
}
.expand {
    animation-name: open;
    animation-duration: 0.1s;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
}

.de-expand {
    animation: close 0.1s linear forwards;
}

@keyframes open {
    from {
        -webkit-line-clamp: 2;
    }
    to {
        -webkit-line-clamp: initial;
    }
}

@keyframes close {
    from {
        -webkit-line-clamp: initial;
    }
    to {
        -webkit-line-clamp: 2;
    }
}
</style>