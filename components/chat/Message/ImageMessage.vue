<template>
    <v-container>
        <v-img max-height="300" max-width="300" :src="imageSrc" contain>
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
    </v-container>
</template>

<script>
import { duration } from './utils/recorder'

export default {
    props: {
        imageSrc: {
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
        valueOfProgressBar() {
            return (this.playedSoFar / this.audioTime)
        }
    }
}
</script>

<style scoped>

</style>