<template>
    <v-list-item two-line class="back-status">
        <v-list-item-avatar size="40">
            <Avatar :substituteChar="'K'" 
                :avatarUrl="'/images/LL1.jpg'"
                :timeOut="12000" 
                :avatarSize="40" 
                :textSize="5" />
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title >Jhon</v-list-item-title>
            <v-list-item-subtitle> last seen recently</v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
    
}
</script>


<style scoped>

.back-status {
    	/* #2d383c */
    background-color: 	#2f3136;
}
</style>