<template>
    <v-list-item two-line class="back-status">
        <v-list-item-content class="py-1">
            <v-list-item-title > {{ getProfileName }} </v-list-item-title>
            <v-list-item-subtitle> {{ getLastSeen }} </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-icon>mdi-dots-vertical</v-icon>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
export default {
    props: {
        profile: {
            type: Object,
            require: false
        }
    },
    computed: {
        getProfileName() {
            if (this.profile != undefined) {
                return this.profile.firstname
            }

            return ''
        },
        getLastSeen() {
            if (this.profile != undefined) {
                return this.profile.firstname
            }

            return ''
        }
    }
    
}
</script>


<style scoped>

.back-status {
    	/* #2d383c */
    background-color: 	#2f3136;
}
</style>