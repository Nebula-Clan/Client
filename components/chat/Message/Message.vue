<template>
    <div :class="getClass">
        <v-card max-width="350" elevation="3" class="card-back text--secondary pa-2 ">
            <v-card-text :class="getText">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium, explicabo odit esse ea ipsum perspiciatis ut eaque ab, reprehenderit beatae, voluptate vero modi repudiandae et sit aperiam dolorum qui reiciendis!
            </v-card-text>
            <v-card-actions class="pa-0">
            <v-icon v-if="random" class="ml-auto" size="16" style="filter: contrast(50%);">
                mdi-email-outline
            </v-icon>
            </v-card-actions>
        </v-card>
    </div>
</template>


<script>
export default {
    data() {
        return {
            random: false
        }
    },
    created() {
        this.shit()
    },
    computed: {
        getClass() {
            if (this.random) {
                return 'ml-auto mr-2'
            } else {
                return 'mr-auto ml-2'
            }
        },
        getText() {
            if (this.random) {
                return 'pa-0 mr-8 green--text text--lighten-1'
            } else {
                return 'pa-0 mr-8'
            }
        }
    },
    methods: {
        shit() {
            let s = Math.floor((Math.random() * 10) + 1) % 2
            if (s==0) {
                this.random = true
            } else {
                this.random = false
            }
        }
    }
}
</script>


<style scoped>

.card-back {
    background-color: #35363a;
}

.unseen-icon {
    filter: contrast(50%);
    position: absolute;
    right:0px;
    bottom: 0px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding-left: 5px;
}
</style>