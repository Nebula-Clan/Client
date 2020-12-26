<template>
    <v-container>
        <v-icon @click="openNewWindowAndDownload">mdi-cloud-download-outline</v-icon>
    </v-container>
</template>

<script>
import { duration } from './utils/recorder'

export default {
    props: {
        fileUrl: {
            required: true,
            type: String
        }
    },
    data() {
        return {
            audio: null,
            isPlaying: false,
            audioTime: 1,
            playedSoFar: 0,
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        openNewWindowAndDownload() {
            window.open(this.fileUrl, '_blank');
        }
    }
}
</script>

<style scoped>

</style>