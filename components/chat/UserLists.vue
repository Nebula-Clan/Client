<template>
    <v-container class="user-list-color ml-0 overflow-y-auto" :style="userListHeight">
        <v-row dense>
            <v-col cols="12">
                <v-container class="py-0 d-inline-flex">
                    <p class="text-h4 pl-1 mb-0 text--secondary"> Chats </p>
                    <v-icon class="ml-auto">mdi-dots-vertical</v-icon>
                </v-container>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12">
                <v-container class="pb-0">
                        <v-text-field
                            hide-details
                            prepend-inner-icon="mdi-account-search"
                            label="Search pepole"
                            single-line
                            solo
                            dense
                            class="search-field"
                        ></v-text-field>
                </v-container>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="pb-0">
                <v-container>
                    <template v-for="i in 12" class="pl-0">
                        <Profile :key="i * 23" class="pl-0" />
                        <v-divider :key="i * 27" class="ml-14 mr-3"></v-divider>
                    </template>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import Profile from '~/components/chat/Profile'


export default {
    data() {
        return {
            n: 10,
            window: {
                width: 0,
                height: 0
            }
        }
    },
    computed: {
        userListHeight() {
            return {
                'max-height': this.window.height + 'px'
            }
        }
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        }
    }
}
</script>

<style scoped>

.user-list-color {
    background-color: #2f3136;
}

.scroll {
    overflow: hidden;
}

.search-field {
    background-color:#202023;
    border-radius: 10px;
}

::-webkit-scrollbar {
    width: 4px;
    height: 10px;

}
::-webkit-scrollbar-thumb {
border-radius: 8px;
background: #c2c9d2;
}
</style>