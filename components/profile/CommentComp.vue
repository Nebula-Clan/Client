<template>
    <v-list-item three-line @click="oneClick" class="cursor">
        <v-list-item-avatar v-if="isReply" size="80">
            <v-img src="/images/LL1.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <div class="overline mb-0" v-if="isReply">
                {{ comment.commentOwnerNickname + ':' }}
            </div>
            <v-list-item-subtitle :class="getExpandClass">
                <!-- {{ comment.commentBody }} -->
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam quis iusto rerum labore officia, eos similique aliquid facere, asperiores maxime molestias dicta harum beatae assumenda distinctio veniam eius? Aliquam libero dolor dolores mollitia sit, nisi est quisquam iste impedit repudiandae voluptas soluta assumenda ad unde, adipisci labore vero dolorem voluptatem fugiat consequatur quidem ex inventore ipsum. Autem reprehenderit ullam dolores.
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
            expanded: false,
            delay: 350,
            clicks: 0
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
    },
    methods: {
        changeExpand() {
            this.expanded = !this.expanded
        },
        changeRoute() {
            console.log(this.$router)
            this.$router.push({
                path: `/profile/${ this.comment.commentOwnerUsername }`,
                query: {
                    'show': 'comments'
                },
                hash: `#${ this.comment.commentID }`
            })
        },
        oneClick: function(event){
          this.clicks++ 
          if(this.clicks === 1) {
            let self = this
            this.timer = setTimeout(function() {
              self.changeExpand()
              self.clicks = 0
            }, this.delay);
          } else{
             clearTimeout(this.timer);  
             this.changeRoute()
             this.clicks = 0;
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