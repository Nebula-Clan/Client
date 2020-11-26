<template>
    <v-container @click="oneClick" class="cursor py-1">
        <v-list-item three-line>
            <v-list-item-avatar v-if="isReply" size="80">
                <Avatar :substituteChar="getFirstChar" :avatarUrl="getCommentOwnerImage"
                :timeOut="12000" :avatarSize="80" :textSize="4" />
            </v-list-item-avatar>
            <v-list-item-content class="align-list-item">
                <div class="overline mb-0" v-if="isReply">
                    {{ comment.commentOwnerNickname + ':' }}
                </div>
                <v-list-item-subtitle class="comment-expand">
                    <v-clamp autoresize :max-lines="lines" @clampchange="isClamped">
                        {{ comment.commentBody }}
                    </v-clamp>
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-row justify="end" align="end" v-if="hasButtonForClamp">
            <p class="text-subtitle-2 blue--text text--darken-1 mb-2 mr-2 more-cursor" @click="changeExpand">
                {{ seeString }} <v-icon color="blue darken-1" size="21">{{ arrow }}</v-icon>
            </p>
        </v-row>
    </v-container>
</template>


<script>
import VClamp from 'vue-clamp'

export default {
    components: {
        VClamp
    },
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
            clicks: 0,
            isClamp: false,
            lines: 2,
            seeString: 'More',
            arrow: 'mdi-arrow-down-drop-circle-outline',
            hasButtonForClamp: false,
            isTrigger: false
        }
    },
    computed: {
        getCommentOwnerImage() {
            return this.$axios.defaults.baseURL + this.comment.commentOwnerImageUrl
        },
        getExpandClass() {
            if (this.expanded) {
                return 'expand'
            } else {
                return 'de-expand'
            }
        },
        getFirstChar() {
            return this.comment.commentOwnerNickname.slice(0, 1).toUpperCase()
        }
    },
    methods: {
        changeExpand() {
            this.isTrigger = true
            if (this.lines == 2) {
                this.seeString = 'Less'
                this.arrow = 'mdi-arrow-up-drop-circle-outline'
                this.lines = 99999999
            } else {
                this.seeString = 'More'
                this.arrow = 'mdi-arrow-down-drop-circle-outline'
                this.lines = 2
            }
        },
        changeRoute() {
            let route = this.$router.resolve({
                path: `/profile/${ this.comment.commentOwnerUsername }`,
                query: {
                    'show': 'comments'
                },
                hash: `#${ this.comment.commentID }`
            })
            window.open(route.href,"_self")
        },
        oneClick: function(event){
          this.clicks++ 
          if(this.clicks === 1) {
            let self = this
            this.timer = setTimeout(function() {
              self.clicks = 0
            }, this.delay);
          } else{
             clearTimeout(this.timer);  
             this.changeRoute()
             this.clicks = 0;
          }         
        },
        isClamped(event) {
            if (event) {
                this.hasButtonForClamp = true
            } else if (!this.isTrigger) {
                this.hasButtonForClamp = false
            }
            this.isClamp = event
        }  
    }
}
</script>


<style scoped>

.align-list-item {
    align-self: auto;
}

.comment-author {
    text-transform: none !important;
}

.comment-cursor {
    cursor: context-menu;
}

.more-cursor {
    cursor: pointer;
}

.comment-expand {
    -webkit-line-clamp: initial;
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