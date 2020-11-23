<template>
    <v-row justify="start" align="center" no-gutters class="fill-height">
        <v-col cols="12" xl="3" lg="3">
            <UserLists />
        </v-col>
        <v-col cols="12" xl="9" lg="9" class="px-0 fill-height">
            <ChattingSection />
        </v-col>
    </v-row>
</template>


<script>
import UserLists from '~/components/chat/UserLists'
import ChattingSection from '~/components/chat/ChattingSection'
export default {
    
}
</script>

<style scoped>

</style>