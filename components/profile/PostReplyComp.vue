<template>
    <v-container @click="oneClick" class="post-cursor py-3">
        <v-list-item three-line>
            <v-list-item-avatar tile size="80" color="grey">
                <v-img :src="getPostImage">
                    <template v-slot:placeholder>
                        <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                        >
                        <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                        ></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <div class="overline mb-3">
                    {{ post.postTitle }}
                </div>
                <v-list-item-subtitle class="expand-post">
                    <v-clamp autoresize :max-lines="lines" @clampchange="isClamped">
                        {{ post.postDescription }}
                    </v-clamp>
                    <div v-if="!isClamp" class="mt-2">
                        <v-chip
                        nuxt
                        :key="i"
                        v-for="(tag, i) in post.postHashtags"
                        :to="'/search/hashtag?keyword=' + tag.replace('#', '') + '&sort=latest'"
                        outlined
                        class="my-1 mr-2"
                        :color="chipsColors[i]"
                        >
                        {{tag}}
                        </v-chip>
                    </div>
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    <v-row justify="center" align="center" v-if="hasButtonForClamp">
        <p class="text-subtitle-2 blue--text text--darken-1 mb-0 more-cursor" @click="changeExpand">
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
        post: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            chipsColors: ['blue', 'red', 'green', 'purple', 'orange'],
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
        getPostImage() {
            return this.$axios.defaults.baseURL + this.post.postImageURL
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
            console.log(this.$router)
            this.$router.push({
                path: `/posts/${ this.post.postID }`
            })
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

.post-cursor {
    cursor: context-menu;
}

.more-cursor {
    cursor: pointer;
}

.post-title {
    font-size: 3rem;
    text-transform: none !important;
}

.expand-post {
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